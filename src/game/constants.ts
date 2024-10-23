// 8 8
// 7 12
// 6 20
// 5 28
// 4 36
// 3 36
// 2 32
// 1 28

import { type AbilityInstance, type Card } from "@prisma/client";

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

export const DeckTypeNames = ["market", "starting"] as const;

export const InitialMatchState = {
  arena: {
    cards: [],
  },
  player1: {
    control: 30,
    mw: 1,
    datab: 0,
    startDeck: [] as CardWithAbilityInstances[],
    marketDeck: [] as CardWithAbilityInstances[],
    cards: [],
    AFKCount: 0,
  },
  player2: {
    control: 30,
    mw: 1,
    datab: 0,
    startDeck: [] as CardWithAbilityInstances[],
    marketDeck: [] as CardWithAbilityInstances[],
    cards: [],
    AFKCount: 0,
  },
};

export type MatchStateType = typeof InitialMatchState;

export type CardWithAbilityInstances = Card & {
  cardAbilities: {
    abilityInstance: AbilityInstance;
  }[];
};

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
  "firewall",
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

export const CardAttributes = [
  "physical",
  "digital",
  "agentic",
  "biological",
] as const;

export type CardAttribute = (typeof CardAttributes)[number];

export type CardDetails = {
  name: string;
  variants: { name: string; attributes: CardAttribute[] }[];
  playsTo?: string[];
};

export const CARDS: Record<CardTypeName, CardDetails> = {
  operator: {
    name: "operator",
    playsTo: ["stagingSlot"],
    variants: [
      {
        name: "human",
        attributes: ["physical", "biological", "agentic"],
      },
      {
        name: "animal",
        attributes: ["physical", "biological"],
      },
      {
        name: "program",
        attributes: ["physical", "digital"],
      },
      {
        name: "robot",
        attributes: ["digital", "physical", "agentic"],
      },
      {
        name: "drone",
        attributes: ["digital", "physical"],
      },
      {
        name: "vehicle",
        attributes: ["digital", "physical"],
      },
    ],
  },
  install: {
    name: "install",
    playsTo: ["installSlot"],
    variants: [
      {
        name: "gateway",
        attributes: ["physical", "digital"],
      },
      { name: "wall", attributes: ["physical"] },
      { name: "firewall", attributes: ["digital"] },
      { name: "program", attributes: ["digital"] },
      {
        name: "sensor",
        attributes: ["digital", "physical"],
      },
      {
        name: "turret",
        attributes: ["digital", "physical"],
      },
    ],
  },
  asset: {
    name: "asset",
    playsTo: ["assetSlot"],
    variants: [
      { name: "production", attributes: ["physical"] },
      { name: "program", attributes: ["digital"] },
      { name: "ai", attributes: ["digital", "agentic"] },
      {
        name: "datacenter",
        attributes: ["digital", "physical"],
      },
      { name: "investment", attributes: ["digital"] },
      { name: "trap", attributes: ["physical"] },
    ],
  },
  cash: {
    name: "cash",
    playsTo: ["cashSlot"],
    variants: [
      { name: "¥1", attributes: [] },
      { name: "¥2", attributes: [] },
      { name: "¥3", attributes: [] },
    ],
  },
  mod: {
    name: "mod",
    playsTo: ["operator"],
    variants: [
      {
        name: "training",
        attributes: ["physical", "agentic", "biological"],
      },
      { name: "program", attributes: ["digital"] },
      {
        name: "upgrade",
        attributes: ["digital", "physical"],
      },
      { name: "gear", attributes: ["physical"] },
      { name: "bionic", attributes: ["biological"] },
      {
        name: "substance",
        attributes: ["biological", "physical"],
      },
    ],
  },
  contract: {
    name: "contract",
    variants: [
      {
        name: "hit",
        attributes: ["physical", "biological"],
      },
      {
        name: "tag",
        attributes: ["digital", "physical", "agentic"],
      },
      {
        name: "recall",
        attributes: ["physical", "digital"],
      },
      { name: "delta", attributes: ["digital"] },
      {
        name: "knowledge",
        attributes: ["digital", "agentic"],
      },
      { name: "bolster", attributes: ["physical"] },
    ],
  },
  command: {
    name: "command",
    variants: [
      {
        name: "hit",
        attributes: ["physical", "biological"],
      },
      {
        name: "tag",
        attributes: ["digital", "physical", "agentic"],
      },
      {
        name: "recall",
        attributes: ["physical", "digital"],
      },
      { name: "delta", attributes: ["digital"] },
      {
        name: "knowledge",
        attributes: ["digital", "agentic"],
      },
      { name: "bolster", attributes: ["physical"] },
    ],
  },
  leader: {
    name: "leader",
    variants: [{ name: "human", attributes: ["biological"] }],
  },
  hq: {
    name: "hq",
    variants: [
      {
        name: "tower",
        attributes: ["physical", "digital"],
      },
      { name: "camp", attributes: ["physical", "digital"] },
      {
        name: "bunker",
        attributes: ["physical", "digital"],
      },
      {
        name: "barge",
        attributes: ["physical", "digital"],
      },
    ],
  },
};

export const AllAbilities = [
  "passive",
  "active",
  "status",
  "unreleased",
  "singleUse",
  "add",
  "erase",
  "remove",
  "neosense",
  "disorder",
  "disrupt",
  "lethal",
  "rapid",
  "camo",
  "parry",
  "shield",
  "alert",
  "siphon",
  "harvest",
  "overkill",
  "intimidate",
  "pierce",
  "durable",
  "renewable",
  "steal",
  "trap",
  "disarm",
  "analytics",
  "brute",
  "hinder",
  "discard",
  "draw",
  "convert",
  "key",
  "lock",
  "preprod",
  "flash",
  "resilient",
  "kaizen",
  "crack",
  "niche",
  "sneak",
  "internal",
  "external",
  "transfer",
  "track",
  "tracked",
  "gate",
  "staged",
  "boosted",
  "armed",
  "hidden",
  "revealed",
  "up",
  "down",
  "disabled",
  "locked",
  "engaged",
  "hindered",
  "optimized",
  "exploited",
  "blocked",
  "shielded",
  "digital",
  "physical",
  "biological",
] as const;

export type AbilityType = (typeof AllAbilities)[number];

export const PassiveAbilities = [
  "disorder",
  "lethal",
  "rapid",
  "camo",
  "parry",
  "shield",
  "alert",
  "siphon",
  "harvest",
  "overkill",
  "intimidate",
  "pierce",
  "durable",
  "renewable",
  "steal",
  "trap",
  "analytics",
  "draw",
  "preprod",
  "resilient",
  "kaizen",
  "niche",
  "sneak",
  "internal",
  "external",
  "transfer",
  "digital",
  "physical",
  "biological",
] as const;
export type PassiveAbility = (typeof PassiveAbilities)[number];

export const ActiveAbilities = [
  "add",
  "remove",
  "neosense",
  "disrupt",
  "disarm",
  "brute",
  "hinder",
  "discard",
  "convert",
  "key",
  "lock",
  "flash",
  "crack",
  "track",
  "erase",
] as const;
export type ActiveAbility = (typeof ActiveAbilities)[number];

export const StatusAbilities = [
  "tracked",
  "gate",
  "staged",
  "boosted",
  "armed",
  "hidden",
  "revealed",
  "up",
  "down",
  "disabled",
  "locked",
  "engaged",
  "hindered",
  "optimized",
  "exploited",
  "blocked",
  "shielded",
  "erased",
  "powered",
  "unpowered",
] as const;
export type StatusAbility = (typeof StatusAbilities)[number];

// ---- v 0.1 Abilities
export const ABILITIES = {
  add: {
    desc: "Add X points of Y type on target card (using Z points passively when active, or at T timing logic).",
    abilityType: "active",
    attack: 0,
    defense: 0,
    datab: 0,
    control: 0,
    costDatab: 0,
    costMw: 0,
    costYen: 0,
    costLag: 0,
    costControl: 0,
    logic: "onEngage",
  },
  remove: {
    desc: "Remove X points of Y type on target card (using Z points passively when active, or at T timing logic).",
    abilityType: "active",
    attack: 0,
    defense: 0,
    datab: 0,
    control: 0,
    costDatab: 0,
    costMw: 0,
    costYen: 0,
    costLag: 0,
    costControl: 0,
    logic: "onEngage",
  },
  neosense: {
    desc: "Reveal slot on Approach. If it has a card, that card is now Up. Or reveal card on Approach. (Reveals Camo) (Pay X datab)",
    abilityType: "active",
    datab: 0,
    logic: "onEngage",
  },
  disorder: {
    desc: "The first card this Approaches this turn stays Down, if Down already.",
    abilityType: "passive",
    logic: "onFirstApproach",
  },
  clout: {
    desc: "Buy X card type from the shop for Y less Yen.",
    abilityType: "passive",
    yen: 0,
  },
  disrupt: {
    desc: "Target card is Disabled this turn (Pay X Yen or Datab), based on T logic.",
    yen: 0,
    abilityType: "active",
    logic: "onFirstEngage",
  },
  lethal: {
    desc: "The first card this Engages this turn is Overcome immediately.",
    abilityType: "passive",
    logic: "onFirstEngage",
  },
  rapid: {
    desc: "This Operator is ready the same turn that it is played.",
    abilityType: "passive",
    targetType: "operator",
    logic: "onPlayed",
  },
  camo: {
    desc: "Hidden until after this Engages the first time this turn, unless Neosensed.",
    abilityType: "passive",
    logic: "afterFirstEngage",
  },
  parry: {
    desc: "The first instance of Attack damage that would be done to this card this turn is reduced by X.",
    abilityType: "passive",
    attack: -1,
    logic: "onFirstEngage",
  },
  shield: {
    desc: "Use X Mw to enable Shielded when this is first Engaged this turn, if available.",
    abilityType: "passive",
    costMw: 1,
    logic: "onFirstEngage",
  },
  alert: {
    desc: "This can't be targeted by opponent Contracts or Commands. (It requires X Mw.)",
    abilityType: "passive",
    costMw: 0,
    logic: "alwaysReady",
  },
  siphon: {
    desc: "Transfer X Yen from opponent's Account to your Account when Logic T happens.",
    abilityType: "passive",
    yen: 0,
    logic: "onOvercome",
  },
  harvest: {
    desc: "Transfer X Datab or Mw to this card, or to your Database, or to your Grid from an opponent Card with Datab, up to X as available when T happens.",
    abilityType: "passive",
    targetType: "self",
    datab: 0,
    logic: "onOvercome",
  },
  overkill: {
    desc: "Remove X more Control with a successful attack on the HQ this turn.",
    abilityType: "passive",
    control: 0,
    logic: "onSuccessfulAttack",
  },
  intimidate: {
    desc: "When this Overcomes a card, the next card this Engages this turn has -X Attack.",
    abilityType: "passive",
    attack: 0,
    logic: "onOvercome",
  },
  pierce: {
    desc: "Deal X damage to the first Card this Engages this turn.",
    abilityType: "passive",
    attack: 0,
    logic: "onFirstEngage",
  },
  durable: {
    desc: "This can't be Disabled, Discarded, Removed, or Stolen by the opponent.",
    abilityType: "passive",
    logic: "onEngage",
  },
  renewable: {
    desc: "When this is Discarded, it moves to the bottom of its Owner's deck.",
    abilityType: "passive",
    logic: "onDiscard",
  },
  steal: {
    desc: "After this Overcomes an Asset a Race is run and if you win then the Asset moves to your Discard pile.",
    abilityType: "passive",
    targetType: "operator",
    logic: "onOvercome",
  },
  trap: {
    desc: "If this isn't disarmed by using Points or Abilities then X of Y points change or Z effect is applied to target card.",
    abilityType: "passive",
    logic: "onEngage",
  },
  disarm: {
    desc: "Disable a Trap ability without triggering it. (By paying X datab)",
    abilityType: "active",
    datab: 0,
    logic: "onEngage",
  },
  analytics: {
    desc: "For each time this Engaged this turn, gain 1 datab (or 1 yen) at end of turn in your database.",
    abilityType: "passive",
    datab: 0,
    yen: 0,
    engages: 0,
    logic: "endOfTurn",
  },
  brute: {
    desc: "This card wins the next Race. (if you pay X datab)",
    abilityType: "active",
    datab: 0,
    logic: "onEngage",
  },
  hinder: {
    desc: "Target card loses the next Race. (if you pay X datab)",
    abilityType: "active",
    datab: 0,
    logic: "onEngage",
  },
  discard: {
    desc: "Target card is Discarded immediately.",
    abilityType: "active",
    logic: "onEngage",
  },
  draw: {
    desc: "Draw X Cards (paying Y Yen, Datab, or Mw) at T timing.",
    abilityType: "passive",
    cards: 0,
    yen: 0,
    datab: 0,
    logic: "startOfTurn",
  },
  convert: {
    desc: "Convert X points into Y points.",
    abilityType: "active",
    logic: "onEngage",
  },
  key: {
    desc: "Unlock target Locked card. (Paying X Datab)",
    abilityType: "active",
    costDatab: 0,
    logic: "onEngage",
  },
  lock: {
    desc: "Lock target card on T logic. (By paying X Datab)",
    abilityType: "active",
    costDatab: 0,
    logic: "onEngage",
  },
  erase: {
    desc: "Permanently remove target card from the game (Pay X of Y units at T logic).",
    abilityType: "active",
    costControl: 0,
    logic: "onFirstEngage",
  },
  preprod: {
    desc: "This card is Disabled until X turns after it is played.",
    abilityType: "passive",
    turns: 0,
    logic: "onPlayed",
  },
  flash: {
    desc: "Remove all Statuses on target Card. (paying X datab)",
    abilityType: "active",
    datab: 0,
    logic: "onEngage",
  },
  resilient: {
    desc: "After Overcoming with 0 or more Defense, this card regains X Defense.",
    abilityType: "passive",
    defense: 0,
    logic: "onOvercome",
  },
  kaizen: {
    desc: "Upon Overcoming a card, this card gains X of Y points.",
    abilityType: "passive",
    attack: 0,
    defense: 0,
    datab: 0,
    logic: "onOvercome",
  },
  crack: {
    desc: "Target player must discard X Cards from their hand at the start of their next turn (based on T timing or event.)",
    abilityType: "active",
    cards: 0,
    logic: "onOvercome",
  },
  niche: {
    desc: "This card can only engage X Variant, Type, Player, or Card.",
    abilityType: "passive",
    logic: "onEngage",
  },
  sneak: {
    desc: "Bypass the first card Engaged this turn. (pay X mw)",
    abilityType: "passive",
    costMw: 0,
    logic: "onFirstApproach",
  },
  internal: {
    desc: "Can only target you and/or your cards.",
    abilityType: "passive",
  },
  external: {
    desc: "Can only target your opponent and/or your opponent's cards.",
    abilityType: "passive",
  },
  singleUse: {
    desc: "This card or ability can only be played once and then it is Erased.",
    abilityType: "passive",
  },
  powered: {
    desc: "This card or ability is powered (its Mw cost is paid this turn).",
    abilityType: "status",
  },
  unpowered: {
    desc: "This card or ability is not powered (its Mw cost is not paid this turn).",
    abilityType: "status",
  },
  erased: {
    desc: "This card or ability is permanently removed from the match.",
    abilityType: "status",
  },
  transfer: {
    desc: "Move X points from one card to another at T timing.",
    abilityType: "passive",
    logic: "onEngage",
  },
  track: {
    desc: "Pay X datab to track target card. If its Defense is 0 or loses a race this turn, it's discarded immediately.",
    abilityType: "active",
  },
  tracked: {
    desc: "If this card has its Defense reduced to 0 or loses a race this turn, it's discarded immediately.",
    abilityType: "status",
  },
  gate: {
    desc: "This card can't be Bypassed.",
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
  hidden: {
    desc: "This Card and/or Slot can't be seen by the opponent.",
    abilityType: "status",
  },
  revealed: {
    desc: "This Card and/or Slot can be seen by the opponent.",
    abilityType: "status",
  },
  up: {
    desc: "This card is face up (it may Engage).",
    abilityType: "status",
  },
  down: {
    desc: "This card is face down for the opponent (it may not Engage).",
    abilityType: "status",
  },
  disabled: {
    desc: "This can't use any Abilities.",
    abilityType: "status",
  },
  locked: {
    desc: "This can't be Up until a Key is used on it.",
    abilityType: "status",
  },
  engaged: {
    desc: "This is engaged by another card or cards.",
    abilityType: "status",
  },
  hindered: {
    desc: "This card loses races.",
    abilityType: "status",
  },
  optimized: {
    desc: "This card wins races.",
    abilityType: "status",
  },
  exploited: {
    desc: "This card has -X of Y points.",
    abilityType: "status",
  },
  blocked: {
    desc: "Ignore Contracts, Commands, or Actives targeted at this card.",
    abilityType: "status",
  },
  shielded: {
    desc: "Any opponent Contracts, Commands, or other card Abilities are ignored by this card.",
    abilityType: "status",
  },
  digital: {
    desc: "This can engage with other Digital cards. (programs, AI, drones, etc.)",
    abilityType: "status",
  },
  physical: {
    desc: "This can engage with other Physical cards.",
    abilityType: "status",
  },
  biological: {
    desc: "This can engage with other Biological cards.",
    abilityType: "status",
  },
  burn: {
    desc: "Remove all Mods on target Card.",
    abilityType: "active",
  },
};

// --- -1 UNRELEASEDABILITIES

export const UNRELEASEDABILITIES = {
  exploit: {
    desc: "Do something cool",
    abilityType: "active",
    ruleSet: "-1",
  },
  decoy: {
    desc: "When this Engages, the opposing card's abilities and effects are applied instantly but don't target this card.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  decrypt: {
    desc: "something strong",
    abilityType: "active",
    ruleSet: "-1",
  },
  arc: {
    desc: "This card may engage X cards ahead of its slot.",
    abilityType: "passive",
    cards: 0,
    ruleSet: "-1",
  },
  link: {
    desc: "Gain X of Y points when you control two or more cards with Link. When one Linked card is overcome, all Linked cards in the Arena become face Up.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  enhance: {
    desc: "When you reveal an opponent's Install or Asset also reveal a card in their hand.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  emergency: {
    desc: "Draw X Cards if this is the first Card you drew this turn.",
    abilityType: "passive",
    cards: 0,
    logic: "startOfTurn",
    ruleSet: "-1",
  },
  shard: {
    desc: "Add card X to your hand at start of your next Y turns or when you pay Y points.",
    abilityType: "passive",
    ruleSet: "-1",
    logic: "startOfTurn",
  },
  host: {
    desc: "This card can have mods of type X installed on it.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  lateral: {
    desc: "This Operator may move to a neighboring stack after Overcoming a card.",
    abilityType: "passive",
    ruleSet: "-1",
  },
  peek: {
    desc: "Pay X Datab or Yen and target Slot is Revealed and if it has a card, that card is now Up.",
    abilityType: "active",
    ruleSet: "-1",
  },
  scan: {
    desc: "Look at the top 3 Cards in your deck. Add 1 to your hand and place the other 2 on the bottom. At T logic or timing.",
    abilityType: "active",
    cards: 3,
    logic: "startOfTurn",
    ruleSet: "-1",
  },
  erase: {
    desc: "Permanently take target card out of the game.",
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
    desc: "All cards in target Stack or Team lose X Datab.",
    abilityType: "active",
    datab: 1,
    ruleSet: "-1",
  },
  hide: {
    desc: "Make target card you control Hidden.",
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
    desc: "Target slot is Down for X turns.",
    abilityType: "active",
    ruleSet: "-1",
    turns: 0,
  },
  upgrade: {
    desc: "When this card is played, choose an upgrade from a set of options.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  meme: {
    desc: "Your next Datab generating effect triggers twice.",
    abilityType: "unreleased",
    ruleSet: "-1",
  },
  clone: {
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
};
