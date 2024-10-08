export const GAME_MODES = {
  normal: "normal",
  tournament: "tournament",
  private: "private",
};

export const GAME_TYPES = {
  normal: "normal",
  tournament: "tournament",
  private: "private",
};

export const STATUSES = {
  started: "started",
  ended: "ended",
};

export type CardTypeName =
  | "operator"
  | "install"
  | "asset"
  | "cash"
  | "mod"
  | "contract"
  | "command"
  | "leader"
  | "hq";

export type CardVariant =
  | "human"
  | "animal"
  | "program"
  | "robot"
  | "drone"
  | "vehicle"
  | "infrastructure"
  | "wall"
  | "trap"
  | "turret"
  | "AI"
  | "decoy"
  | "investment"
  | "training"
  | "gear"
  | "bionic"
  | "chemical"
  | "tower"
  | "camp"
  | "bunker"
  | "barge"
  | "¥1"
  | "¥2"
  | "¥3";

export type CardType = {
  name: CardTypeName;
  variants: CardVariant[];
};

export const CARDTYPES: Record<CardTypeName, CardType> = {
  operator: {
    name: "operator",
    variants: ["human", "animal", "program", "robot", "drone", "vehicle"],
  },
  install: {
    name: "install",
    variants: ["infrastructure", "program", "drone", "wall", "trap", "turret"],
  },
  asset: {
    name: "asset",
    variants: [
      "infrastructure",
      "program",
      "AI",
      "decoy",
      "investment",
      "trap",
    ],
  },
  cash: {
    name: "cash",
    variants: ["¥1", "¥2", "¥3"],
  },
  mod: {
    name: "mod",
    variants: ["training", "program", "drone", "gear", "bionic", "chemical"],
  },
  contract: {
    name: "contract",
    variants: [],
  },
  command: {
    name: "command",
    variants: [],
  },
  leader: {
    name: "leader",
    variants: ["human"],
  },
  hq: {
    name: "hq",
    variants: ["tower", "camp", "bunker", "barge"],
  },
};

export const RARITIES = {
  c: "c",
  b: "b",
  a: "a",
  s: "s",
};

export const DECKTYPES = {
  starting: "starting",
  market: "market",
};
