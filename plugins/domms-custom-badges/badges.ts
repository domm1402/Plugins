export type BadgeItem = {
  id: string
  label: string
  image: string
  kind: 'image' | 'discord'
  icon?: string
  description?: string
}

// Only Discord badge artwork with known Discord CDN badge-icon assets.
// These are local visual previews, not account entitlements.
const OFFICIAL_BADGES: Array<[string, string, string]> = [
  ['staff', 'Discord Staff', '48d5bdcffe9e7848067c2e187f1ef951'],
  ['partner', 'Discord Partner', '34306011e46e87f8ef25f3415d3b99ca'],
  ['hypesquad', 'HypeSquad Events', 'bf01d1073931f921909045f3a39fd264'],
  ['bug-hunter', 'Bug Hunter', '2717692c7dca7289b35297368a940dd0'],
  ['bug-hunter-gold', 'Bug Hunter Level 2', '848f79194d4be5ff5f81505cbd0ce1e6'],
  ['early-supporter', 'Early Supporter', '7060786766c9c840eb3019e725d2b358'],
  ['active-developer', 'Active Developer', '6bdc42827a38498929a4920da12695d9'],
  ['verified-developer', 'Verified Bot Developer', '6df5892e0f35b051f8b61eace34f4967'],
  ['certified-moderator', 'Discord Certified Moderator', 'fee1624003e2fee35cb398e125dc479b'],
  ['premium', 'Discord Nitro', '2ba85e8026a8614b640c2837bcdfe21b'],
]

export const DEFAULT_BADGES: BadgeItem[] = OFFICIAL_BADGES.map(([id, label, hash]) => ({
  id,
  label,
  kind: 'discord',
  image: `https://cdn.discordapp.com/badge-icons/${hash}.png`,
  description: `${label} badge artwork`,
}))

const OFFICIAL_BADGE_IDS = new Set(DEFAULT_BADGES.map(badge => badge.id))

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
    setItems(next: BadgeItem[]) { items = next.filter(item => OFFICIAL_BADGE_IDS.has(item.id)); notify() },
    getItems() { return items },
    getProps(id: string) { return props.get(id) },
    addBadges(original: unknown[], userId: string) {
      const native = original.filter(value => !isRecord(value) || typeof value.id !== 'string' || !value.id.startsWith('dcb-'))
      const custom = items.map(item => {
        const id = 'dcb-' + item.id
        const image = item.image
        props.set(id, { id, userId, label: item.label, source: { uri: image } })
        return { id, description: item.description || item.label, icon: item.id, iconSrc: image }
      })
      return [...native, ...custom]
    },
  }
}
