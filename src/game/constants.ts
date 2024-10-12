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

export type OperatorVariant =
  | "human"
  | "animal"
  | "program"
  | "robot"
  | "drone"
  | "vehicle";
export type InstallVariant =
  | "infrastructure"
  | "program"
  | "drone"
  | "wall"
  | "sensor"
  | "turret";
export type AssetVariant =
  | "infrastructure"
  | "program"
  | "AI"
  | "decoy"
  | "investment"
  | "trap";
export type CashVariant = "¥1" | "¥2" | "¥3";
export type ModVariant =
  | "training"
  | "program"
  | "upgrade"
  | "gear"
  | "bionic"
  | "substance";
export type ContractVariant =
  | "hit"
  | "tag"
  | "recall"
  | "delta"
  | "knowledge"
  | "bolster";
export type CommandVariant =
  | "hit"
  | "tag"
  | "recall"
  | "delta"
  | "knowledge"
  | "bolster";
export type LeaderVariant = "human";
export type HQVariant = "tower" | "camp" | "bunker" | "barge";

export type CardVariant =
  | OperatorVariant
  | InstallVariant
  | AssetVariant
  | CashVariant
  | ModVariant
  | ContractVariant
  | CommandVariant
  | LeaderVariant
  | HQVariant;

export type CardSlots =
  | "installSlot"
  | "assetSlot"
  | "cashSlot"
  | "modSlot"
  | "contractSlot"
  | "commandSlot"
  | "leaderSlot"
  | "hqSlot"
  | "stagingSlot";

type VariantAttributes = {
  isOrganic?: boolean;
  isCommunicator?: boolean;
  isDigital?: boolean;
  targetVariants?: string[];
};

type CardType = {
  variants: Record<string, VariantAttributes>;
  playsTo?: string[];
};

export const CARDS: Record<CardTypeName, CardType> = {
  operator: {
    variants: {
      human: {
        isOrganic: true,
        isCommunicator: true,
      },
      animal: {
        isOrganic: true,
      },
      program: {
        isDigital: true,
      },
      robot: {
        isDigital: true,
        isCommunicator: true,
      },
      drone: {
        isDigital: true,
      },
      vehicle: {
        isDigital: true,
      },
    },
    playsTo: ["stagingSlot"],
  },
  install: {
    variants: {
      infrastructure: {
        isDigital: true,
      },
      wall: {},
      program: {
        isDigital: true,
      },
      drone: {
        isDigital: true,
      },
      sensor: {
        isDigital: true,
      },
      turret: {},
    },
    playsTo: ["installSlot"],
  },
  asset: {
    variants: {
      infrastructure: {},
      program: {
        isDigital: true,
      },
      AI: {
        isDigital: true,
        isCommunicator: true,
      },
      decoy: {},
      investment: {},
      trap: {},
    },
    playsTo: ["assetSlot"],
  },
  cash: {
    variants: {
      "¥1": {},
      "¥2": {},
      "¥3": {},
    },
    playsTo: ["cashSlot"],
  },
  mod: {
    variants: {
      training: {
        targetVariants: ["human", "animal", "AI", "investment"],
      },
      program: {
        targetVariants: ["program", "robot", "drone", "sensor", "AI"],
      },
      upgrade: {
        targetVariants: [
          "robot",
          "drone",
          "vehicle",
          "turret",
          "infrastructure",
        ],
      },
      gear: {
        targetVariants: ["human", "robot", "vehicle"],
      },
      bionic: {
        targetVariants: ["human", "animal"],
      },
      substance: {
        targetVariants: ["human", "animal"],
      },
    },
  },
  contract: {
    variants: {
      hit: {
        targetVariants: ["human", "animal", "AI"],
      },
      tag: {},
      recall: {
        targetVariants: ["drone", "robot", "vehicle", "program"],
      },
      delta: {
        targetVariants: ["infrastructure", "program", "AI"],
      },
      knowledge: {
        targetVariants: ["AI", "human", "animal"],
      },
      bolster: {
        targetVariants: [
          "wall",
          "trap",
          "decoy",
          "infrastructure",
          "vehicle",
          "turret",
        ],
      },
    },
  },
  command: {
    variants: {
      hit: {
        targetVariants: ["human", "animal", "AI"],
      },
      tag: {},
      recall: {
        targetVariants: ["drone", "robot", "vehicle", "program"],
      },
      delta: {
        targetVariants: ["infrastructure", "program", "AI"],
      },
      knowledge: {
        targetVariants: ["AI", "human", "animal"],
      },
      bolster: {
        targetVariants: [
          "wall",
          "trap",
          "decoy",
          "infrastructure",
          "vehicle",
          "turret",
        ],
      },
    },
  },
  leader: {
    variants: {
      human: {
        isOrganic: true,
      },
    },
  },
  hq: {
    variants: {
      tower: {},
      camp: {},
      bunker: {},
      barge: {},
    },
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
