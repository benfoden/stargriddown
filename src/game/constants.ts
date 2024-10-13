export const MATCHMODES = [
  "normal",
  "tournament",
  "testing",
  "private",
] as const;

export const MATCHRANKINGS = ["unranked", "ranked", "testing"] as const;

export const MATCHSTATUSES = ["created", "active", "ended"] as const;

export type MatchMode = (typeof MATCHMODES)[number];

export type MatchRanking = (typeof MATCHRANKINGS)[number];

export type MatchStatus = (typeof MATCHSTATUSES)[number];

export const CardTypeNames = [
  "operator",
  "install",
  "asset",
  "cash",
  "mod",
  "contract",
  "command",
  "leader",
  "hq",
] as const;

export type CardTypeName = (typeof CardTypeNames)[number];

export const OperatorVariants = [
  "human",
  "animal",
  "program",
  "robot",
  "drone",
  "vehicle",
] as const;

export type OperatorVariant = (typeof OperatorVariants)[number];

export const InstallVariants = [
  "gateway",
  "program",
  "drone",
  "wall",
  "sensor",
  "turret",
] as const;

export type InstallVariant = (typeof InstallVariants)[number];

export const AssetVariants = [
  "production",
  "program",
  "AI",
  "datacenter",
  "investment",
  "trap",
] as const;

export type AssetVariant = (typeof AssetVariants)[number];

export const CashVariants = ["¥1", "¥2", "¥3"] as const;

export type CashVariant = (typeof CashVariants)[number];

export const ModVariants = [
  "training",
  "program",
  "upgrade",
  "gear",
  "bionic",
  "substance",
] as const;

export type ModVariant = (typeof ModVariants)[number];

export const ContractVariants = [
  "hit",
  "tag",
  "recall",
  "delta",
  "knowledge",
  "bolster",
] as const;

export type ContractVariant = (typeof ContractVariants)[number];

export const CommandVariants = [
  "hit",
  "tag",
  "recall",
  "delta",
  "knowledge",
  "bolster",
] as const;

export type CommandVariant = (typeof CommandVariants)[number];

export const LeaderVariants = ["human"] as const;

export type LeaderVariant = (typeof LeaderVariants)[number];

export const HQVariants = ["tower", "camp", "bunker", "barge"] as const;

export type HQVariant = (typeof HQVariants)[number];

export const Rarities = ["c", "b", "a", "s"] as const;

export type Rarity = (typeof Rarities)[number];

export const DeckTypes = ["starting", "market", "testing"] as const;

export type DeckType = (typeof DeckTypes)[number];

export type CardVariant =
  | OperatorVariant
  | InstallVariant
  | AssetVariant
  | CashVariant
  | ModVariant
  | ContractVariant
  | LeaderVariant
  | HQVariant;

export const CardSlots = [
  "installSlot",
  "assetSlot",
  "cashSlot",
  "modSlot",
  "contractSlot",
  "commandSlot",
  "leaderSlot",
  "hqSlot",
  "stagingSlot",
] as const;

export type CardSlot = (typeof CardSlots)[number];

export const CardAttributes = ["phyiscal", "digital", "agentic", "biological"];

export type CardAttribute = (typeof CardAttributes)[number];

export type CardDetails = {
  variants: Record<string, CardAttribute[]>;
  playsTo?: string[];
};

export const CARDS: Record<CardTypeName, CardDetails> = {
  operator: {
    variants: {
      human: ["physical", "biological", "agentic"],
      animal: ["physical", "biological"],
      program: ["physical", "digital"],
      robot: ["digital", "physical", "agentic"],
      drone: ["digital", "physical"],
      vehicle: ["digital", "physical"],
    },
    playsTo: ["stagingSlot"],
  },
  install: {
    variants: {
      gateway: ["physical", "digital"],
      wall: ["physical"],
      program: ["digital"],
      drone: ["digital", "physical"],
      sensor: ["digital", "physical"],
      turret: ["physical", "digital"],
    },
    playsTo: ["installSlot"],
  },
  asset: {
    variants: {
      production: ["physical", "digital"],
      program: ["digital"],
      AI: ["digital", "agentic"],
      datacenter: ["digital", "physical"],
      investment: ["digital"],
      trap: ["digital", "physical"],
    },
    playsTo: ["assetSlot"],
  },
  cash: {
    variants: {
      "¥1": [],
      "¥2": [],
      "¥3": [],
    },
    playsTo: ["cashSlot"],
  },
  mod: {
    variants: {
      training: ["physical", "agentic", "biological"],
      program: ["digital"],
      upgrade: ["digital", "physical"],
      gear: ["physical"],
      bionic: ["biological"],
      substance: ["biological", "physical"],
    },
    playsTo: ["operator"],
  },
  contract: {
    variants: {
      hit: ["physical", "biological"],
      tag: ["digital", "physical", "agentic"],
      recall: ["physical", "digital"],
      delta: ["digital"],
      knowledge: ["digital", "agentic"],
      bolster: ["physical"],
    },
  },
  command: {
    variants: {
      hit: ["physical", "biological"],
      tag: ["digital", "physical", "agentic"],
      recall: ["physical", "digital"],
      delta: ["digital"],
      knowledge: ["digital", "agentic"],
      bolster: ["physical"],
    },
  },
  leader: {
    variants: {
      human: ["biological"],
    },
  },
  hq: {
    variants: {
      tower: ["physical", "digital"],
      camp: ["physical", "digital"],
      bunker: ["physical", "digital"],
      barge: ["physical", "digital"],
    },
  },
};

export const AbilityTypes = [
  "passive",
  "active",
  "status",
  "unreleased",
  "singleUse",
] as const;

export type AbilityType = (typeof AbilityTypes)[number];

export const PassiveAbilities = [
  "digital",
  "lethal",
  "rapid",
  "camo",
  "shielded",
  "alert",
  "siphon",
  "harvest",
  "overkill",
  "intimidate",
  "piercing",
  "durable",
  "renewable",
  "steal",
  "trap",
  "link",
  "analytics",
  "enhance",
  "emergency",
  "preprod",
  "niche",
  "shard",
  "host",
  "lateral",
  "clout",
] as const;
export type PassiveAbility = (typeof PassiveAbilities)[number];

export const ActiveAbilities = [
  "leak",
  "scan",
  "hack",
  "erase",
  "disarm",
  "disrupt",
  "procedure",
  "boost",
  "drain",
  "virus",
  "flash",
  "brute",
  "message",
  "key",
  "lock",
  "hide",
  "reuse",
  "ravage",
  "track",
] as const;
export type ActiveAbility = (typeof ActiveAbilities)[number];

export const StatusAbilities = [
  "hidden",
  "shielded",
  "staged",
  "boosted",
  "armed",
  "disabled",
  "disrupted",
  "locked",
  "engaged",
] as const;
export type StatusAbility = (typeof StatusAbilities)[number];

export const ABILITIES = {
  lethal: {
    desc: "The next card this Approaches is Disabled immediately.",
    abilityType: "passive",
  },
  rapid: {
    desc: "This Operator is ready the same turn that it is played.",
    abilityType: "passive",
  },
  camo: {
    desc: "Hidden until this Attacks, Defends, or uses an Active ability.",
    abilityType: "passive",
  },
  shield: {
    desc: "The first instance of Attack damage that would be done to this card is Negated by X.",
    abilityType: "passive",
    attack: 0,
  },
  alert: {
    desc: "This can't be targeted by opponent Contracts, Commands, or Actives as long as you have more than 1 Mw available.",
    abilityType: "passive",
    costMw: 1,
  },
  siphon: {
    desc: "Add X Yen to your Account when this Overcomes an opponent Card.",
    abilityType: "passive",
    yen: 0,
  },
  harvest: {
    desc: "Add X Datab to your Database when this Overcomes an opponent Card with X Datab available.",
    abilityType: "passive",
    datab: 0,
  },
  overkill: {
    desc: "Remove X more control with the next successful attack on the HQ this turn.",
    abilityType: "passive",
    control: 0,
  },
  intimidate: {
    desc: "When this Overcomes a card, the next card you Engage this turn has -X Attack.",
    abilityType: "passive",
    attack: 0,
  },
  piercing: {
    desc: "Deal X Attack when this begins to Engage a card.",
    abilityType: "passive",
    attack: 0,
  },
  durable: {
    desc: "This card can't be Discarded or Erased by the opponent.",
    abilityType: "passive",
  },
  renewable: {
    desc: "When this is Discarded, it moves to the bottom of its Owner's deck.",
    abilityType: "passive",
  },
  steal: {
    desc: "After this overcomes an Asset, a Race is run, and if this player wins, then the Asset is stolen.",
    abilityType: "passive",
  },
  trap: {
    desc: "If this isn't disarmed by using Points or Abilities then X of Y points change or Z effect is applied to target card.",
    abilityType: "passive",
  },
  analytics: {
    desc: "Gain X Datab at end of turn.",
    abilityType: "passive",
    datab: 0,
  },
  boost: {
    desc: "Add X points of Y type on target card (using Z points, or passively at T timing).",
    abilityType: "active",
  },
  brute: {
    desc: "Win the next Race.",
    abilityType: "active",
  },
  message: {
    desc: "Draw X Cards.",
    abilityType: "active",
    cards: 0,
  },
  key: {
    desc: "Unlock target Locked card. (By paying X Datab)",
    abilityType: "active",
    costDatab: 0,
  },
  lock: {
    desc: "Lock target card. (By paying X Datab)",
    abilityType: "active",
    costDatab: 0,
  },
  hidden: {
    desc: "This card can't be seen by the opponent.",
    abilityType: "status",
  },
  staged: {
    desc: "This card can't join an Attack.",
    abilityType: "status",
  },
  boosted: {
    desc: "This card has X of Y points.",
    abilityType: "status",
  },
  armed: {
    desc: "This card's Trap ability is ready.",
    abilityType: "status",
  },
  disabled: {
    desc: "This card can't be activated.",
    abilityType: "status",
  },
  disrupted: {
    desc: "This card can't use abilities or points.",
    abilityType: "status",
  },
  locked: {
    desc: "This card can't be Engaged or Activated until a Key is used on it.",
    abilityType: "status",
  },
  engaged: {
    desc: "This card is engaged by another card or cards.",
    abilityType: "status",
  },
  shielded: {
    desc: "This card can't be targeted by opponent Contracts, Commands, or Actives as long as you have more than 1 Mw available.",
    abilityType: "status",
    costMw: 1,
  },
  digital: {
    desc: "This can engage withother Digital cards. (programs, AI, drones, etc.)",
    abilityType: "status",
  },
  physical: {
    desc: "This can engage with and be engaged by other Physical cards.",
    abilityType: "status",
  },
  biological: {
    desc: "This can engage with and be engaged by other Biological cards.",
    abilityType: "status",
  },
  convert: {
    desc: "Convert X points into Y points.",
    abilityType: "active",
  },
};

export const UNRELEASEDABILITIES = {
  link: {
    desc: "Gain X of Y points when you control two or more cards with Link. When overcome, all Linked cards you control in the Arena are revealed.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  enhance: {
    desc: "When an opponent Install or Asset is revealed, reveal a card in their hand.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  emergency: {
    desc: "Draw X Cards if this is the first Card you drew.",
    abilityType: "passive",
    cards: 0,
    ruleSet: "-1",
  },
  preprod: {
    desc: "Enable this card's abilities X turns after it was played.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  niche: {
    desc: "This card can only engage X card variant, type, or specific card.",
    abilityType: "passive",
    ruleSet: "-1",
    X: "variant",
  },
  shard: {
    desc: "Add card X to your hand at start of your next Y turns.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  host: {
    desc: "This card can have mods of type X installed on it.",
    abilityType: "passive",
    ruleSet: "-1",
    X: "mod type",
  },
  lateral: {
    desc: "This Operator may move to a neighboring stack after Overcoming a card.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  clout: {
    desc: "Buy X card type from the shop for Y less Yen.",
    abilityType: "passive",
    yen: 0,
    ruleSet: "-1",
  },
  leak: {
    desc: "Pay X of Y points and target card is revealed.",
    abilityType: "active",
    ruleSet: "-1",
  },
  scan: {
    desc: "Look at the top 3 Cards in your deck. Add 1 to your hand and place the other 2 on the bottom.",
    abilityType: "active",
    cards: 3,
    ruleSet: "-1",
  },
  hack: {
    desc: "Send the top X Cards of your opponent's deck to their Discard pile.",
    abilityType: "active",
    cards: 0,
    ruleSet: "-1",
  },
  erase: {
    desc: "Permanently remove a card from the game.",
    abilityType: "active",
    ruleSet: "-1",
  },
  disarm: {
    desc: "Deactivate a Trap without triggering it. (By paying X datab)",
    abilityType: "active",
    datab: 0,
    ruleSet: "-1",
  },
  disrupt: {
    desc: "Target card is disabled for the remainder of the turn.",
    abilityType: "active",
    ruleSet: "-1",
  },
  procedure: {
    desc: "Use X Datab in your Database to add Datab to target card.",
    abilityType: "active",
    datab: 0,
    ruleSet: "-1",
  },
  drain: {
    desc: "Remove X points of Y type on target card.",
    abilityType: "active",
    ruleSet: "-1",
  },
  virus: {
    desc: "All cards in target Stack or Team lose 1 Datab.",
    abilityType: "active",
    datab: 1,
    ruleSet: "-1",
  },
  flash: {
    desc: "Remove all Statuses and Digital Mods on target Card.",
    abilityType: "active",
    ruleSet: "-1",
  },
  hide: {
    desc: "Make target card Hidden.",
    abilityType: "active",
    ruleSet: "-1",
  },
  reuse: {
    desc: "Pay X Yen or Y Datab to return this to your hand.",
    abilityType: "active",
    yen: 0,
    datab: 0,
    ruleSet: "-1",
  },
  ravage: {
    desc: "Target card is discarded.",
    abilityType: "active",
    ruleSet: "-1",
  },
  track: {
    desc: "Pay X datab to track target card. If its Defense is reduced to 0 or loses a race this turn, it's discarded immediately.",
    abilityType: "active",
    ruleset: "-1",
  },
  tracked: {
    desc: "If this card has its Defense reduced to 0 or loses a race this turn, it's discarded immediately.",
    abilityType: "status",
    ruleset: "-1",
  },
  Upgrade: {
    desc: "When this card is played, choose an upgrade from a set of options.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  Meme: {
    desc: "Your next Datab generating effect triggers twice.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  Clone: {
    desc: "When played, a copy of this card is played at the same target.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  strike: {
    desc: "This deals Damage before cards without Strike.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  aerial: {
    desc: "This can only be defended or attacked by other Aerial cards or those with Anti-Air.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  antiair: {
    desc: "This can defend or attack Aerial cards.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  underground: {
    desc: "This can't be Engaged by Aerial cards.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  jack: {
    desc: "This Operator, Install, or Asset may be powered (Attack, Datab, or Defense). Lose equivalent Control if it is Overcome.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  airgap: {
    desc: "This can only target or be targeted while Engaged. Only for digital cards.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  decrypt: {
    desc: "Remove all Statuses on target Card.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
};
