export type BadgeItem = {
  id: string
  label: string
  image: string
  kind: 'image' | 'discord'
  icon?: string
}

export const DEFAULT_BADGES: BadgeItem[] = [
  { id: 'staff', label: 'Discord Staff', image: '', kind: 'discord', icon: 'staff' },
  { id: 'partner', label: 'Partner', image: '', kind: 'discord', icon: 'partner' },
  { id: 'hypesquad', label: 'HypeSquad Events', image: '', kind: 'discord', icon: 'hypesquad' },
  { id: 'bug-hunter', label: 'Bug Hunter', image: '', kind: 'discord', icon: 'bug_hunter_level_1' },
  { id: 'early-supporter', label: 'Early Supporter', image: '', kind: 'discord', icon: 'early_supporter' },
  { id: 'active-developer', label: 'Active Developer', image: '', kind: 'discord', icon: 'active_developer' },
]

export function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isCustomId(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('dcb-')
}

export function createStore() {
  let items: BadgeItem[] = []
  let version = 0
  const listeners = new Set<() => void>()
  const props = new Map<string, any>()
  const notify = () => { props.clear(); version++; listeners.forEach(fn => fn()) }
  return {
    subscribe(fn: () => void) { listeners.add(fn); return () => listeners.delete(fn) },
    snapshot: () => version,
    setItems(next: BadgeItem[]) { items = next; notify() },
    getProps(id: string) { return props.get(id) },
    add(original: unknown[]) {
      const native = original.filter(value => !isRecord(value) || !isCustomId(value.id))
      const custom = items.map(item => {
        const id = 'dcb-' + item.id
        const source = item.kind === 'image' ? item.image : ''
        const data = { id, userId: '', source: { uri: source }, label: item.label, icon: item.icon }
        props.set(id, data)
        return { id, description: item.label, icon: item.kind === 'discord' ? item.icon : 'dummy', iconSrc: source || undefined }
      })
      return [...native, ...custom]
    },
  }
}