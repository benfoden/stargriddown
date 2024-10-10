import { type Ability, type Card } from "@prisma/client";

export type CardWithAbilities = Card & {
  cardAbilities: {
    ability: Ability;
  }[];
};
