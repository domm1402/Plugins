import { getStore } from '@valenced/discord/flux'
import { getModules } from '@valenced/modules/finders'
import { withName } from '@valenced/modules/finders/filters'
import { before, instead } from '@valenced/patcher'
import { React, ReactJSXRuntime } from '@valenced/react'
import { useSyncExternalStore } from 'react'
import { createStore, isCustomId, isRecord } from './badges'
import SettingsComponent from './settings'
import type { BadgeItem } from './badges'

type Settings = { badges: BadgeItem[]; showAll: boolean }
type UseBadges = (user: { userId: string } | null) => unknown[]
type UserStore = { getCurrentUser(): { id: string } | undefined }

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

    cleanup(getModules(withName<UseBadges>('useBadges'), module => {
      if (!('default' in module) || typeof module.default !== 'function') return
      cleanup(instead(module, 'default', function(args, original) {
        useSyncExternalStore(store.subscribe, store.snapshot)
        const result = Reflect.apply(original, this, args)
        const viewedUserId = args[0]?.userId
        const ownUserId = userStore?.getCurrentUser()?.id
        return viewedUserId && viewedUserId === ownUserId && Array.isArray(result)
          ? store.add(result)
          : result
      }))
    }, { returnNamespace: true, max: Infinity }))

    const patch = (args: any[]) => {
      const component = args[0]
      const type = isRecord(component) ? component.type : component
      const name = typeof type === 'function' ? type.name : ''
      const props = args[1]
      // Match the badge-row component by its stable prop shape as well as its
      // development name. Production/minified builds may rename the component.
      const isBadgeRows = isRecord(props)
        && typeof props.userId === 'string'
        && Array.isArray(props.badges)
        && typeof props.themeType === 'string'
      if ((name === 'ProfileBadgeRows' || isBadgeRows) && isRecord(props)) {
        const ownUserId = userStore?.getCurrentUser()?.id
        const isOwnProfile = typeof props.userId === 'string' && props.userId === ownUserId
        args[1] = {
          ...props,
          badges: isOwnProfile && Array.isArray(props.badges) ? store.add(props.badges) : props.badges,
          style: isOwnProfile && jsonStorage.cache?.showAll
            ? [props.style, { flexWrap: 'wrap', rowGap: 4, flexShrink: 1 }]
            : props.style,
        }
      } else if (isRecord(props) && isCustomId(props.id)) {
        // ProfileBadge is also matched by its custom ID, so this keeps working
        // when production builds minify component names.
        const custom = store.getProps(props.id)
        if (custom) args[1] = { ...props, source: custom.source, label: custom.label }
      }
      return args
    }

    cleanup(
      before(ReactJSXRuntime, 'jsx', patch),
      before(ReactJSXRuntime, 'jsxs', patch),
      before(React, 'createElement', patch),
    )
  },
  stop({ plugin }) { plugin.requireReload() },
  SettingsComponent,
})
