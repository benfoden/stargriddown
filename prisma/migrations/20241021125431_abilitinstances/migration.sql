-- DropForeignKey
ALTER TABLE "CardAbility" DROP CONSTRAINT "CardAbility_abilityId_fkey";

-- CreateTable
CREATE TABLE "AbilityInstance" (
    "id" TEXT NOT NULL,
    "abilityId" TEXT NOT NULL,
    "targetAttributes" TEXT,
    "targetType" TEXT,
    "targetVariants" TEXT,
    "desc" TEXT,
    "attack" INTEGER,
    "defense" INTEGER,
    "yen" INTEGER,
    "lag" INTEGER,
    "datab" INTEGER,
    "mw" INTEGER,
    "control" INTEGER,
    "cardCount" INTEGER,
    "turns" INTEGER,
    "engages" INTEGER,
    "logic" TEXT,
    "costYen" INTEGER,
    "costControl" INTEGER,
    "costDatab" INTEGER,
    "costMw" INTEGER,
    "costLag" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AbilityInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardAbility" ADD CONSTRAINT "CardAbility_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "AbilityInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
