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

export const CARDTYPES = {
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
  funds: {
    name: "funds",
    variants: [],
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
    variants: ["citadel", "outpost", "bunker"],
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
