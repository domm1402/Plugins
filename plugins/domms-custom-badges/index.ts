import { getStore } from '@valenced/discord/flux'
import { AlertActionCreators } from '@valenced/discord/actions'
import { Design } from '@valenced/discord/design'
import { getModules } from '@valenced/modules/finders'
import { withProps } from '@valenced/modules/finders/filters'
import { insteadJSX } from '@valenced/react/jsx-runtime'
import { createElement, isValidElement } from 'react'
import { Image } from 'react-native'
import { createStore } from './badges'
import SettingsComponent from './settings'
import type { FC, ReactElement, ReactNode } from 'react'
import type { BadgeItem } from './badges'

type Settings = { badges: BadgeItem[]; showAll: boolean }
type UserStore = { getCurrentUser(): { id: string } | undefined }
type ProfileBadgeProps = {
  id: string
  userId: string
  label: string
  source: any
  themeType: string
  badgeSize: number
}
type ProfileBadgeRowsProps = {
  userId: string
  badges: Array<{ description: string; icon: string; id: string; link?: string }>
  themeType: string
  showToastOnPress?: boolean
}
type RenderPatch<P, C = void> = (rendered: ReactNode, props: P, context: C) => ReactNode

const DummyBadgeId = 'domms_custom_badges_dummy'
const DummyBadges = [{ id: DummyBadgeId }] as unknown as ProfileBadgeRowsProps['badges']

function mapElementTree(node: ReactNode, visit: (element: ReactElement<any>) => Record<string, any> | undefined): ReactNode {
  if (Array.isArray(node)) {
    let changed = false
    const next = node.map(child => {
      const mapped = mapElementTree(child, visit)
      if (mapped !== child) changed = true
      return mapped
    })
    return changed ? next : node
  }
  if (!isValidElement(node)) return node
  const element = node as ReactElement<any>
  const patch = visit(element)
  if (patch && 'children' in patch) return createElement(element.type, { ...element.props, ...patch })
  const children = element.props.children
  const nextChildren = children === undefined ? children : mapElementTree(children, visit)
  if (!patch && nextChildren === children) return node
  return createElement(element.type, { ...element.props, ...patch, ...(nextChildren === children ? {} : { children: nextChildren }) })
}

function patchRender<P extends object, C = void>(Component: FC<P>, patch: RenderPatch<P, C>, useContext?: () => C): FC<P> {
  const Wrapped: FC<P> = props => {
    const context = useContext?.() as C
    const rendered = Component(props)
    return rendered instanceof Promise ? rendered.then(node => patch(node, props, context)) as any : patch(rendered, props, context) as any
  }
  return Wrapped
}

export default plugin<{ jsonStorage: Settings }>({
  jsonStorage: { load: true, default: { badges: [], showAll: true } },
  start({ cleanup, jsonStorage, plugin }) {
    if (plugin.startedLate) { plugin.requireReload(); return }
    const store = createStore()
    let userStore: UserStore | undefined
    cleanup(getStore<UserStore>('UserStore', value => { userStore = value }))
    const sync = () => store.setItems([...(jsonStorage.cache?.badges ?? [])])
    sync()
    cleanup(jsonStorage.subscribe(sync))

    const unsub = getModules(
      withProps<{ ProfileBadgeRows: FC<ProfileBadgeRowsProps> }>('ProfileBadgeRows'),
      ({ ProfileBadgeRows }) => {
        cleanup(insteadJSX(ProfileBadgeRows, ([type, props, key], jsx) => {
          const ownId = userStore?.getCurrentUser()?.id
          const currentBadges = store.getItems()
          if (!currentBadges.length || typeof type !== 'function' || !ownId || props.userId !== ownId) return jsx(type, props, key)
          return jsx(
            patchRender(type, (rendered, rowProps) => injectCustomBadges(rendered, rowProps, store)),
            props.badges?.length ? props : { ...props, badges: DummyBadges },
            key,
          )
        }))
      },
      { max: 1 },
    )
    cleanup(unsub)

  },
  stop({ plugin }) { plugin.requireReload() },
  SettingsComponent,
})

function isProfileBadgeElement(node: ReactNode): node is ReactElement<ProfileBadgeProps> {
  if (!isValidElement(node) || typeof node.type !== 'function') return false
  const props = node.props as Partial<ProfileBadgeProps> | null
  return props != null && 'badgeSize' in props && 'userId' in props
}

function injectCustomBadges(rendered: ReactNode, props: ProfileBadgeRowsProps, store: ReturnType<typeof createStore>): ReactNode {
  return mapElementTree(rendered, element => {
    const children = element.props.children
    if (!Array.isArray(children)) return
    const template = children.find(isProfileBadgeElement)
    if (!template) return
    const BadgeComponent = template.type as FC<ProfileBadgeProps>
    const badges = store.getItems()
    const additions = badges.map(item => createElement(
      patchRender(BadgeComponent, (tree, badgeProps) => patchBadge(tree, badgeProps, item)),
      {
        ...template.props,
        key: 'dcb-' + item.id,
        id: 'dcb-' + item.id,
        label: item.label,
        source: item.kind === 'image' ? { uri: item.image } : template.props.source,
      },
    ))
    return {
      children: [
        ...children.filter(child => !isProfileBadgeElement(child) || child.props.id !== DummyBadgeId),
        ...additions,
      ],
      style: [element.props.style, { flexWrap: 'wrap', gap: 0, rowGap: 0, columnGap: 0, justifyContent: 'flex-start' }],
    }
  })
}

function patchBadge(rendered: ReactNode, props: ProfileBadgeProps, badge: BadgeItem): ReactNode {
  let clickPatched = false
  return mapElementTree(rendered, element => {
    if (!clickPatched && ('onPress' in element.props || element.props.accessibilityRole === 'button')) {
      clickPatched = true
      return { onPress: () => showBadge(badge) }
    }
    return undefined
  })
}

const { AlertActionButton, AlertModal, Stack, Text } = Design
function showBadge(badge: BadgeItem) {
  const source = badge.kind === 'image' ? { uri: badge.image } : undefined
  AlertActionCreators.openAlert(
    'domms-custom-badge-' + badge.id,
    <AlertModal
      title={
        <Stack style={{ alignItems: 'center' }}>
          {source ? <Image source={source} style={{ width: 96, height: 96, resizeMode: 'contain' }} /> : null}
          <Text variant="heading-lg/bold" color="mobile-text-heading-primary">{badge.label}</Text>
        </Stack>
      }
      content={badge.description || 'Cosmetic badge stored locally on this device.'}
      actions={<AlertActionButton text="OK" />}
    />,
  )
}
