export type BadgeItem = {
  id: string
  label: string
  image: string
  kind: 'image' | 'discord'
  icon?: string
  description?: string
}

const PRESET_BADGES: BadgeItem[] = [
  { id: 'staff', label: 'Discord Staff', image: '', kind: 'discord', icon: 'staff', description: 'A cosmetic staff-style badge.' },
  { id: 'partner', label: 'Partner', image: '', kind: 'discord', icon: 'partner', description: 'A cosmetic partner-style badge.' },
  { id: 'hypesquad', label: 'HypeSquad Events', image: '', kind: 'discord', icon: 'hypesquad', description: 'A cosmetic HypeSquad badge.' },
  { id: 'bug-hunter', label: 'Bug Hunter', image: '', kind: 'discord', icon: 'bug_hunter_level_1', description: 'A cosmetic bug hunter badge.' },
  { id: 'bug-hunter-gold', label: 'Bug Hunter Gold', image: '', kind: 'discord', icon: 'bug_hunter_level_2' },
  { id: 'early-supporter', label: 'Early Supporter', image: '', kind: 'discord', icon: 'early_supporter' },
  { id: 'active-developer', label: 'Active Developer', image: '', kind: 'discord', icon: 'active_developer' },
  { id: 'verified-developer', label: 'Verified Bot Developer', image: '', kind: 'discord', icon: 'verified_developer' },
  { id: 'certified-moderator', label: 'Certified Moderator', image: '', kind: 'discord', icon: 'certified_moderator' },
  { id: 'premium', label: 'Nitro', image: '', kind: 'discord', icon: 'premium' },
  { id: 'premium-early', label: 'Early Nitro', image: '', kind: 'discord', icon: 'premium_early_supporter' },
  { id: 'booster-1', label: 'Server Booster I', image: '', kind: 'discord', icon: 'guild_booster_lvl1' },
  { id: 'booster-2', label: 'Server Booster II', image: '', kind: 'discord', icon: 'guild_booster_lvl2' },
  { id: 'booster-3', label: 'Server Booster III', image: '', kind: 'discord', icon: 'guild_booster_lvl3' },
  { id: 'booster-4', label: 'Server Booster IV', image: '', kind: 'discord', icon: 'guild_booster_lvl4' },
  { id: 'booster-5', label: 'Server Booster V', image: '', kind: 'discord', icon: 'guild_booster_lvl5' },
  { id: 'booster-6', label: 'Server Booster VI', image: '', kind: 'discord', icon: 'guild_booster_lvl6' },
  { id: 'booster-7', label: 'Server Booster VII', image: '', kind: 'discord', icon: 'guild_booster_lvl7' },
  { id: 'booster-8', label: 'Server Booster VIII', image: '', kind: 'discord', icon: 'guild_booster_lvl8' },
  { id: 'booster-9', label: 'Server Booster IX', image: '', kind: 'discord', icon: 'guild_booster_lvl9' },
  { id: 'quest', label: 'Quest Champion', image: '', kind: 'discord', icon: 'quest_completed' },
  { id: 'orb', label: 'Orb Collector', image: '', kind: 'discord', icon: 'orb' },
  { id: 'events', label: 'Event Regular', image: '', kind: 'discord', icon: 'hypesquad' },
  { id: 'community', label: 'Community Star', image: '', kind: 'discord', icon: 'partner' },
  { id: 'supporter', label: 'Supporter', image: '', kind: 'discord', icon: 'early_supporter' },
  { id: 'creator', label: 'Creator', image: '', kind: 'discord', icon: 'verified_developer' },
  { id: 'moderator', label: 'Moderator', image: '', kind: 'discord', icon: 'certified_moderator' },
  { id: 'tester', label: 'Beta Tester', image: '', kind: 'discord', icon: 'bug_hunter_level_1' },
  { id: 'legend', label: 'Legend', image: '', kind: 'discord', icon: 'premium_early_supporter' },
  { id: 'veteran', label: 'Veteran', image: '', kind: 'discord', icon: 'early_supporter' },
  { id: 'founder', label: 'Founder', image: '', kind: 'discord', icon: 'staff' },
  { id: 'vip', label: 'VIP', image: '', kind: 'discord', icon: 'partner' },
  { id: 'elite', label: 'Elite Member', image: '', kind: 'discord', icon: 'guild_booster_lvl9' },
  { id: 'champion', label: 'Champion', image: '', kind: 'discord', icon: 'quest_completed' },
  { id: 'night-owl', label: 'Night Owl', image: '', kind: 'discord', icon: 'active_developer' },
  { id: 'early-access', label: 'Early Access', image: '', kind: 'discord', icon: 'early_supporter' },
]

const PRESET_EMOJI: Record<string, string> = {
  "staff": "1f3e2",
  "partner": "1f91d",
  "hypesquad": "1f3c6",
  "bug-hunter": "1f41b",
  "bug-hunter-gold": "1f48e",
  "early-supporter": "1f31f",
  "active-developer": "1f4bb",
  "verified-developer": "2705",
  "certified-moderator": "1f6e1",
  "premium": "1f680",
  "premium-early": "1f451",
  "booster-1": "1f525",
  "booster-2": "1f4a5",
  "booster-3": "1f31f",
  "booster-4": "1f48e",
  "booster-5": "1f451",
  "booster-6": "1f3c6",
  "booster-7": "1f947",
  "booster-8": "1f48e",
  "booster-9": "1f4ab",
  "quest": "1f3af",
  "orb": "1f52e",
  "events": "1f389",
  "community": "1f465",
  "supporter": "1f49a",
  "creator": "1f3a8",
  "moderator": "1f6e1",
  "tester": "1f9ea",
  "legend": "1f451",
  "veteran": "1f396",
  "founder": "1f3c5",
  "vip": "1f48e",
  "elite": "1f4ab",
  "champion": "1f947",
  "night-owl": "1f989",
  "early-access": "1f513"
}

export const DEFAULT_BADGES: BadgeItem[] = PRESET_BADGES.map(badge => ({
  ...badge,
  kind: 'image',
  image: `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${PRESET_EMOJI[badge.id] || '1f3c6'}.png`,
}))

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
    getItems() { return items },
    getProps(id: string) { return props.get(id) },
    add(original: unknown[]) {
      const native = original.filter(value => !isRecord(value) || !isCustomId(value.id))
      const custom = items.map(item => {
        const id = 'dcb-' + item.id
        const source = item.kind === 'image' ? item.image : ''
        props.set(id, { id, userId: '', source: source ? { uri: source } : undefined, label: item.label, icon: item.icon, description: item.description || item.label })
        return { id, description: item.description || item.label, icon: item.icon || 'dummy', iconSrc: source || undefined }
      })
      return [...native, ...custom]
    },
  }
}
