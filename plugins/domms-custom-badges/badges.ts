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

const EXTRA_BADGES: BadgeItem[] = [
  {
    "id": "pixel-artist",
    "label": "Pixel Artist",
    "image": "",
    "kind": "image",
    "description": "Pixel Artist cosmetic badge."
  },
  {
    "id": "speedrunner",
    "label": "Speedrunner",
    "image": "",
    "kind": "image",
    "description": "Speedrunner cosmetic badge."
  },
  {
    "id": "completionist",
    "label": "Completionist",
    "image": "",
    "kind": "image",
    "description": "Completionist cosmetic badge."
  },
  {
    "id": "explorer",
    "label": "Explorer",
    "image": "",
    "kind": "image",
    "description": "Explorer cosmetic badge."
  },
  {
    "id": "collector",
    "label": "Collector",
    "image": "",
    "kind": "image",
    "description": "Collector cosmetic badge."
  },
  {
    "id": "architect",
    "label": "Architect",
    "image": "",
    "kind": "image",
    "description": "Architect cosmetic badge."
  },
  {
    "id": "strategist",
    "label": "Strategist",
    "image": "",
    "kind": "image",
    "description": "Strategist cosmetic badge."
  },
  {
    "id": "tactician",
    "label": "Tactician",
    "image": "",
    "kind": "image",
    "description": "Tactician cosmetic badge."
  },
  {
    "id": "sharpshooter",
    "label": "Sharpshooter",
    "image": "",
    "kind": "image",
    "description": "Sharpshooter cosmetic badge."
  },
  {
    "id": "guardian",
    "label": "Guardian",
    "image": "",
    "kind": "image",
    "description": "Guardian cosmetic badge."
  },
  {
    "id": "healer",
    "label": "Healer",
    "image": "",
    "kind": "image",
    "description": "Healer cosmetic badge."
  },
  {
    "id": "ranger",
    "label": "Ranger",
    "image": "",
    "kind": "image",
    "description": "Ranger cosmetic badge."
  },
  {
    "id": "wizard",
    "label": "Wizard",
    "image": "",
    "kind": "image",
    "description": "Wizard cosmetic badge."
  },
  {
    "id": "sorcerer",
    "label": "Sorcerer",
    "image": "",
    "kind": "image",
    "description": "Sorcerer cosmetic badge."
  },
  {
    "id": "dragon-slayer",
    "label": "Dragon Slayer",
    "image": "",
    "kind": "image",
    "description": "Dragon Slayer cosmetic badge."
  },
  {
    "id": "phoenix",
    "label": "Phoenix",
    "image": "",
    "kind": "image",
    "description": "Phoenix cosmetic badge."
  },
  {
    "id": "frostborn",
    "label": "Frostborn",
    "image": "",
    "kind": "image",
    "description": "Frostborn cosmetic badge."
  },
  {
    "id": "storm-chaser",
    "label": "Storm Chaser",
    "image": "",
    "kind": "image",
    "description": "Storm Chaser cosmetic badge."
  },
  {
    "id": "starbound",
    "label": "Starbound",
    "image": "",
    "kind": "image",
    "description": "Starbound cosmetic badge."
  },
  {
    "id": "moonwalker",
    "label": "Moonwalker",
    "image": "",
    "kind": "image",
    "description": "Moonwalker cosmetic badge."
  },
  {
    "id": "sunbringer",
    "label": "Sunbringer",
    "image": "",
    "kind": "image",
    "description": "Sunbringer cosmetic badge."
  },
  {
    "id": "comet",
    "label": "Comet",
    "image": "",
    "kind": "image",
    "description": "Comet cosmetic badge."
  },
  {
    "id": "galaxy",
    "label": "Galaxy",
    "image": "",
    "kind": "image",
    "description": "Galaxy cosmetic badge."
  },
  {
    "id": "cosmic",
    "label": "Cosmic",
    "image": "",
    "kind": "image",
    "description": "Cosmic cosmetic badge."
  },
  {
    "id": "nebula",
    "label": "Nebula",
    "image": "",
    "kind": "image",
    "description": "Nebula cosmetic badge."
  },
  {
    "id": "deep-space",
    "label": "Deep Space",
    "image": "",
    "kind": "image",
    "description": "Deep Space cosmetic badge."
  },
  {
    "id": "timekeeper",
    "label": "Timekeeper",
    "image": "",
    "kind": "image",
    "description": "Timekeeper cosmetic badge."
  },
  {
    "id": "speed-demon",
    "label": "Speed Demon",
    "image": "",
    "kind": "image",
    "description": "Speed Demon cosmetic badge."
  },
  {
    "id": "lucky",
    "label": "Lucky",
    "image": "",
    "kind": "image",
    "description": "Lucky cosmetic badge."
  },
  {
    "id": "four-leaf",
    "label": "Four Leaf",
    "image": "",
    "kind": "image",
    "description": "Four Leaf cosmetic badge."
  },
  {
    "id": "diamond",
    "label": "Diamond",
    "image": "",
    "kind": "image",
    "description": "Diamond cosmetic badge."
  },
  {
    "id": "ruby",
    "label": "Ruby",
    "image": "",
    "kind": "image",
    "description": "Ruby cosmetic badge."
  },
  {
    "id": "sapphire",
    "label": "Sapphire",
    "image": "",
    "kind": "image",
    "description": "Sapphire cosmetic badge."
  },
  {
    "id": "emerald",
    "label": "Emerald",
    "image": "",
    "kind": "image",
    "description": "Emerald cosmetic badge."
  },
  {
    "id": "golden",
    "label": "Golden",
    "image": "",
    "kind": "image",
    "description": "Golden cosmetic badge."
  },
  {
    "id": "silver",
    "label": "Silver",
    "image": "",
    "kind": "image",
    "description": "Silver cosmetic badge."
  },
  {
    "id": "bronze",
    "label": "Bronze",
    "image": "",
    "kind": "image",
    "description": "Bronze cosmetic badge."
  },
  {
    "id": "championship",
    "label": "Championship",
    "image": "",
    "kind": "image",
    "description": "Championship cosmetic badge."
  },
  {
    "id": "trophy-hunter",
    "label": "Trophy Hunter",
    "image": "",
    "kind": "image",
    "description": "Trophy Hunter cosmetic badge."
  },
  {
    "id": "quest-master",
    "label": "Quest Master",
    "image": "",
    "kind": "image",
    "description": "Quest Master cosmetic badge."
  },
  {
    "id": "mission-ready",
    "label": "Mission Ready",
    "image": "",
    "kind": "image",
    "description": "Mission Ready cosmetic badge."
  },
  {
    "id": "task-force",
    "label": "Task Force",
    "image": "",
    "kind": "image",
    "description": "Task Force cosmetic badge."
  },
  {
    "id": "team-player",
    "label": "Team Player",
    "image": "",
    "kind": "image",
    "description": "Team Player cosmetic badge."
  },
  {
    "id": "community-hero",
    "label": "Community Hero",
    "image": "",
    "kind": "image",
    "description": "Community Hero cosmetic badge."
  },
  {
    "id": "helper",
    "label": "Helpful",
    "image": "",
    "kind": "image",
    "description": "Helpful cosmetic badge."
  },
  {
    "id": "mentor",
    "label": "Mentor",
    "image": "",
    "kind": "image",
    "description": "Mentor cosmetic badge."
  },
  {
    "id": "teacher",
    "label": "Teacher",
    "image": "",
    "kind": "image",
    "description": "Teacher cosmetic badge."
  },
  {
    "id": "scholar",
    "label": "Scholar",
    "image": "",
    "kind": "image",
    "description": "Scholar cosmetic badge."
  },
  {
    "id": "bookworm",
    "label": "Bookworm",
    "image": "",
    "kind": "image",
    "description": "Bookworm cosmetic badge."
  },
  {
    "id": "code-wizard",
    "label": "Code Wizard",
    "image": "",
    "kind": "image",
    "description": "Code Wizard cosmetic badge."
  },
  {
    "id": "bug-squasher",
    "label": "Bug Squasher",
    "image": "",
    "kind": "image",
    "description": "Bug Squasher cosmetic badge."
  },
  {
    "id": "debugger",
    "label": "Debugger",
    "image": "",
    "kind": "image",
    "description": "Debugger cosmetic badge."
  },
  {
    "id": "maker",
    "label": "Maker",
    "image": "",
    "kind": "image",
    "description": "Maker cosmetic badge."
  },
  {
    "id": "inventor",
    "label": "Inventor",
    "image": "",
    "kind": "image",
    "description": "Inventor cosmetic badge."
  },
  {
    "id": "innovator",
    "label": "Innovator",
    "image": "",
    "kind": "image",
    "description": "Innovator cosmetic badge."
  },
  {
    "id": "designer",
    "label": "Designer",
    "image": "",
    "kind": "image",
    "description": "Designer cosmetic badge."
  },
  {
    "id": "musician",
    "label": "Musician",
    "image": "",
    "kind": "image",
    "description": "Musician cosmetic badge."
  },
  {
    "id": "artist",
    "label": "Artist",
    "image": "",
    "kind": "image",
    "description": "Artist cosmetic badge."
  },
  {
    "id": "photographer",
    "label": "Photographer",
    "image": "",
    "kind": "image",
    "description": "Photographer cosmetic badge."
  },
  {
    "id": "film-maker",
    "label": "Filmmaker",
    "image": "",
    "kind": "image",
    "description": "Filmmaker cosmetic badge."
  },
  {
    "id": "streamer",
    "label": "Streamer",
    "image": "",
    "kind": "image",
    "description": "Streamer cosmetic badge."
  },
  {
    "id": "content-creator",
    "label": "Content Creator",
    "image": "",
    "kind": "image",
    "description": "Content Creator cosmetic badge."
  },
  {
    "id": "night-shift",
    "label": "Night Shift",
    "image": "",
    "kind": "image",
    "description": "Night Shift cosmetic badge."
  },
  {
    "id": "early-bird",
    "label": "Early Bird",
    "image": "",
    "kind": "image",
    "description": "Early Bird cosmetic badge."
  },
  {
    "id": "weekend-warrior",
    "label": "Weekend Warrior",
    "image": "",
    "kind": "image",
    "description": "Weekend Warrior cosmetic badge."
  },
  {
    "id": "marathon",
    "label": "Marathon",
    "image": "",
    "kind": "image",
    "description": "Marathon cosmetic badge."
  },
  {
    "id": "zen-master",
    "label": "Zen Master",
    "image": "",
    "kind": "image",
    "description": "Zen Master cosmetic badge."
  },
  {
    "id": "firestarter",
    "label": "Firestarter",
    "image": "",
    "kind": "image",
    "description": "Firestarter cosmetic badge."
  },
  {
    "id": "ice-cold",
    "label": "Ice Cold",
    "image": "",
    "kind": "image",
    "description": "Ice Cold cosmetic badge."
  },
  {
    "id": "electric",
    "label": "Electric",
    "image": "",
    "kind": "image",
    "description": "Electric cosmetic badge."
  },
  {
    "id": "wave-rider",
    "label": "Wave Rider",
    "image": "",
    "kind": "image",
    "description": "Wave Rider cosmetic badge."
  },
  {
    "id": "mountain-climber",
    "label": "Mountain Climber",
    "image": "",
    "kind": "image",
    "description": "Mountain Climber cosmetic badge."
  },
  {
    "id": "deep-diver",
    "label": "Deep Diver",
    "image": "",
    "kind": "image",
    "description": "Deep Diver cosmetic badge."
  },
  {
    "id": "wild-card",
    "label": "Wild Card",
    "image": "",
    "kind": "image",
    "description": "Wild Card cosmetic badge."
  },
  {
    "id": "mvp",
    "label": "MVP",
    "image": "",
    "kind": "image",
    "description": "MVP cosmetic badge."
  },
  {
    "id": "legendary",
    "label": "Legendary",
    "image": "",
    "kind": "image",
    "description": "Legendary cosmetic badge."
  },
  {
    "id": "unstoppable",
    "label": "Unstoppable",
    "image": "",
    "kind": "image",
    "description": "Unstoppable cosmetic badge."
  },
  {
    "id": "fearless",
    "label": "Fearless",
    "image": "",
    "kind": "image",
    "description": "Fearless cosmetic badge."
  },
  {
    "id": "mystery",
    "label": "Mystery",
    "image": "",
    "kind": "image",
    "description": "Mystery cosmetic badge."
  },
  {
    "id": "secret-agent",
    "label": "Secret Agent",
    "image": "",
    "kind": "image",
    "description": "Secret Agent cosmetic badge."
  },
  {
    "id": "treasure-hunter",
    "label": "Treasure Hunter",
    "image": "",
    "kind": "image",
    "description": "Treasure Hunter cosmetic badge."
  },
  {
    "id": "vault-keeper",
    "label": "Vault Keeper",
    "image": "",
    "kind": "image",
    "description": "Vault Keeper cosmetic badge."
  },
  {
    "id": "royalty",
    "label": "Royalty",
    "image": "",
    "kind": "image",
    "description": "Royalty cosmetic badge."
  },
  {
    "id": "royal-guard",
    "label": "Royal Guard",
    "image": "",
    "kind": "image",
    "description": "Royal Guard cosmetic badge."
  },
  {
    "id": "party-starter",
    "label": "Party Starter",
    "image": "",
    "kind": "image",
    "description": "Party Starter cosmetic badge."
  },
  {
    "id": "good-vibes",
    "label": "Good Vibes",
    "image": "",
    "kind": "image",
    "description": "Good Vibes cosmetic badge."
  },
  {
    "id": "friendly-face",
    "label": "Friendly Face",
    "image": "",
    "kind": "image",
    "description": "Friendly Face cosmetic badge."
  },
  {
    "id": "big-brain",
    "label": "Big Brain",
    "image": "",
    "kind": "image",
    "description": "Big Brain cosmetic badge."
  },
  {
    "id": "brainiac",
    "label": "Brainiac",
    "image": "",
    "kind": "image",
    "description": "Brainiac cosmetic badge."
  },
  {
    "id": "puzzle-solver",
    "label": "Puzzle Solver",
    "image": "",
    "kind": "image",
    "description": "Puzzle Solver cosmetic badge."
  },
  {
    "id": "riddle-master",
    "label": "Riddle Master",
    "image": "",
    "kind": "image",
    "description": "Riddle Master cosmetic badge."
  },
  {
    "id": "arcade-pro",
    "label": "Arcade Pro",
    "image": "",
    "kind": "image",
    "description": "Arcade Pro cosmetic badge."
  },
  {
    "id": "retro-gamer",
    "label": "Retro Gamer",
    "image": "",
    "kind": "image",
    "description": "Retro Gamer cosmetic badge."
  },
  {
    "id": "controller-king",
    "label": "Controller King",
    "image": "",
    "kind": "image",
    "description": "Controller King cosmetic badge."
  },
  {
    "id": "high-score",
    "label": "High Score",
    "image": "",
    "kind": "image",
    "description": "High Score cosmetic badge."
  },
  {
    "id": "checkpoint",
    "label": "Checkpoint",
    "image": "",
    "kind": "image",
    "description": "Checkpoint cosmetic badge."
  },
  {
    "id": "respawn",
    "label": "Respawn Ready",
    "image": "",
    "kind": "image",
    "description": "Respawn Ready cosmetic badge."
  },
  {
    "id": "boss-fighter",
    "label": "Boss Fighter",
    "image": "",
    "kind": "image",
    "description": "Boss Fighter cosmetic badge."
  },
  {
    "id": "final-boss",
    "label": "Final Boss",
    "image": "",
    "kind": "image",
    "description": "Final Boss cosmetic badge."
  },
  {
    "id": "guild-leader",
    "label": "Guild Leader",
    "image": "",
    "kind": "image",
    "description": "Guild Leader cosmetic badge."
  },
  {
    "id": "party-member",
    "label": "Party Member",
    "image": "",
    "kind": "image",
    "description": "Party Member cosmetic badge."
  }
]

const EXTRA_EMOJI: Record<string, string> = {
  "pixel-artist": "1f3a8",
  "speedrunner": "26a1",
  "completionist": "1f3c6",
  "explorer": "1f9ed",
  "collector": "1f48e",
  "architect": "1f3d7",
  "strategist": "265f",
  "tactician": "1f9e0",
  "sharpshooter": "1f3af",
  "guardian": "1f6e1",
  "healer": "1fa79",
  "ranger": "1f3f9",
  "wizard": "1f9d9",
  "sorcerer": "1f9d9",
  "dragon-slayer": "1f409",
  "phoenix": "1f525",
  "frostborn": "2744",
  "storm-chaser": "26c8",
  "starbound": "1f320",
  "moonwalker": "1f319",
  "sunbringer": "2600",
  "comet": "2604",
  "galaxy": "1f30c",
  "cosmic": "1f52e",
  "nebula": "1f30c",
  "deep-space": "1f680",
  "timekeeper": "23f1",
  "speed-demon": "1f4a8",
  "lucky": "1f340",
  "four-leaf": "1f343",
  "diamond": "1f48e",
  "ruby": "1f48e",
  "sapphire": "1f48e",
  "emerald": "1f49a",
  "golden": "1f947",
  "silver": "1f948",
  "bronze": "1f949",
  "championship": "1f3c6",
  "trophy-hunter": "1f3c6",
  "quest-master": "1f5fa",
  "mission-ready": "1f4cb",
  "task-force": "1f4aa",
  "team-player": "1f465",
  "community-hero": "1f64c",
  "helper": "1f91d",
  "mentor": "1f4da",
  "teacher": "1f4d6",
  "scholar": "1f393",
  "bookworm": "1f4da",
  "code-wizard": "1f4bb",
  "bug-squasher": "1f41b",
  "debugger": "1f50d",
  "maker": "1f527",
  "inventor": "1f4a1",
  "innovator": "1f680",
  "designer": "1f58c",
  "musician": "1f3b5",
  "artist": "1f3a8",
  "photographer": "1f4f8",
  "film-maker": "1f3ac",
  "streamer": "1f4fa",
  "content-creator": "1f4f9",
  "night-shift": "1f303",
  "early-bird": "1f426",
  "weekend-warrior": "1f3d6",
  "marathon": "1f3c3",
  "zen-master": "1f9d8",
  "firestarter": "1f525",
  "ice-cold": "1f9ca",
  "electric": "26a1",
  "wave-rider": "1f30a",
  "mountain-climber": "1f3d4",
  "deep-diver": "1f30a",
  "wild-card": "1f0cf",
  "mvp": "1f31f",
  "legendary": "1f451",
  "unstoppable": "1f4aa",
  "fearless": "1f985",
  "mystery": "2753",
  "secret-agent": "1f575",
  "treasure-hunter": "1f9ed",
  "vault-keeper": "1f512",
  "royalty": "1f451",
  "royal-guard": "1f6e1",
  "party-starter": "1f389",
  "good-vibes": "1f60e",
  "friendly-face": "1f60a",
  "big-brain": "1f9e0",
  "brainiac": "1f9e0",
  "puzzle-solver": "1f9e9",
  "riddle-master": "1f9e9",
  "arcade-pro": "1f3ae",
  "retro-gamer": "1f579",
  "controller-king": "1f3ae",
  "high-score": "1f3c6",
  "checkpoint": "1f6a9",
  "respawn": "1f504",
  "boss-fighter": "1f4a5",
  "final-boss": "1f480",
  "guild-leader": "1f3f0",
  "party-member": "1f46b"
}

export const DEFAULT_BADGES: BadgeItem[] = [...PRESET_BADGES, ...EXTRA_BADGES].map(badge => ({
  ...badge,
  kind: 'image',
  image: `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${PRESET_EMOJI[badge.id] || EXTRA_EMOJI[badge.id] || '1f3c6'}.png`,
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
    addBadges(original: unknown[], userId: string) {
      const native = original.filter(value => !isRecord(value) || typeof value.id !== 'string' || !value.id.startsWith('dcb-'))
      const custom = items.map(item => {
        const id = 'dcb-' + item.id
        const image = item.image || ''
        props.set(id, {
          id,
          userId,
          label: item.label,
          source: image ? { uri: image } : undefined,
        })
        return {
          id,
          description: item.description || item.label,
          icon: item.icon || 'custom',
          iconSrc: image || undefined,
        }
      })
      return [...native, ...custom]
    },
  }
}
