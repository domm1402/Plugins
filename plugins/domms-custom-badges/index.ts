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
type RenderPatch<P> = (rendered: ReactNode, props: P) => ReactNode

const DummyBadgeId = 'domms_custom_badges_dummy'
const DummyBadges = [{ id: DummyBadgeId }] as unknown as ProfileBadgeRowsProps['badges']
const patched = new WeakMap<FC<any>, FC<any>>()

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

function patchRender<P extends object>(Component: FC<P>, patch: RenderPatch<P>): FC<P> {
  const cached = patched.get(Component)
  if (cached) return cached
  const Wrapped: FC<P> = props => patch(Component(props), props)
  patched.set(Component, Wrapped)
  return Wrapped
}

export default plugin<{ jsonStorage: { badges: BadgeItem[]; showAll: boolean } }>({
  jsonStorage: { load: true, default: { badges: [], showAll: true } },
  start({ cleanup, jsonStorage, plugin }) {
    if (plugin.startedLate) { plugin.requireReload(); return }
    const store = createStore()
    const sync = () => store.setItems([...(jsonStorage.cache?.badges ?? [])])
    sync()
    cleanup(jsonStorage.subscribe(sync))

    const unsub = getModules(
      withProps<{ ProfileBadgeRows: FC<ProfileBadgeRowsProps> }>('ProfileBadgeRows'),
      ({ ProfileBadgeRows }) => {
        cleanup(insteadJSX(ProfileBadgeRows, ([type, props, key], jsx) => {
          if (!store.getItems().length || typeof type !== 'function') return jsx(type, props, key)
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
    const additions = store.getItems().map(item => createElement(
      patchRender(BadgeComponent, (tree, badgeProps) => {
        const selected = store.getItem(badgeProps.id)
        return selected ? patchBadge(tree, selected) : tree
      }),
      {
        ...template.props,
        key: 'dcb-' + item.id,
        id: 'dcb-' + item.id,
        label: item.label,
        source: { uri: item.image },
      },
    ))
    return {
      children: [
        ...children.filter(child => !isProfileBadgeElement(child) || child.props.id !== DummyBadgeId),
        ...additions,
      ],
      style: [
        element.props.style,
        { flexDirection: 'row', flexWrap: 'wrap', gap: 0, rowGap: 0, columnGap: 0, justifyContent: 'flex-start', alignItems: 'center' },
      ],
    }
  })
}

function patchBadge(rendered: ReactNode, badge: BadgeItem): ReactNode {
  let pressablePatched = false
  return mapElementTree(rendered, element => {
    if (!pressablePatched && ('onPress' in element.props || element.props.accessibilityRole === 'button')) {
      pressablePatched = true
      return { onPress: () => showBadge(badge) }
    }
    return undefined
  })
}

const { AlertActionButton, AlertModal, Stack, Text } = Design
function showBadge(badge: BadgeItem): void {
  const source = { uri: badge.image }
  AlertActionCreators.openAlert(
    'domms-custom-badge-' + badge.id,
    createElement(AlertModal, {
      title: createElement(
        Stack,
        { style: { alignItems: 'center' } },
        createElement(Image, { source, style: { width: 96, height: 96, resizeMode: 'contain' } }),
        createElement(Text, { variant: 'heading-lg/bold', color: 'mobile-text-heading-primary' }, badge.label),
      ),
      content: badge.description || 'Cosmetic badge stored locally on this device.',
      actions: createElement(AlertActionButton, { text: 'OK' }),
    }),
  )
}
