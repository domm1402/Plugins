import { getModules } from '@valenced/modules/finders'
import { withName } from '@valenced/modules/finders/filters'
import { before } from '@valenced/patcher'
import { React, ReactJSXRuntime } from '@valenced/react'
import { useSyncExternalStore } from 'react'
import { createStore } from './badges'
import SettingsComponent from './settings'

type BadgeHook = (user: { userId: string } | null) => unknown[]

export default plugin<{ jsonStorage: { badges: import('./badges').BadgeItem[]; showAll: boolean } }>({
  jsonStorage: { load: true, default: { badges: [], showAll: true } },
  start({ cleanup, jsonStorage, plugin }) {
    if (plugin.startedLate) { plugin.requireReload(); return }
    const store = createStore()
    const sync = () => store.setItems([...(jsonStorage.cache?.badges ?? [])])
    sync()
    cleanup(jsonStorage.subscribe(sync))

    // Inject locally selected badges into Valenced's real ProfileBadge data pipeline.
    cleanup(getModules(
      withName<BadgeHook>('useBadges'),
      module => {
        if (!('default' in module) || typeof module.default !== 'function') return
        cleanup(before(module, 'default', function (args, original) {
          useSyncExternalStore(store.subscribe, store.snapshot)
          const result = Reflect.apply(original, this, args)
          const user = args[0]
          return user?.userId && Array.isArray(result)
            ? store.addBadges(result, user.userId)
            : result
        }))
      },
      { returnNamespace: true, max: Infinity },
    ))

    const patchProps = (args: [any, any?, ...any[]]) => {
      const component = args[0]
      const type = component && typeof component === 'object' ? component.type : component
      if (typeof type !== 'function' || type.name !== 'ProfileBadge' || !args[1] || typeof args[1].id !== 'string') return args
      const custom = store.getProps(args[1].id)
      if (custom) args[1] = { ...args[1], ...custom }
      return args
    }
    cleanup(before(ReactJSXRuntime, 'jsx', patchProps))
    cleanup(before(ReactJSXRuntime, 'jsxs', patchProps))
    cleanup(before(React, 'createElement', patchProps))
  },
  stop({ plugin }) { plugin.requireReload() },
  SettingsComponent,
})
