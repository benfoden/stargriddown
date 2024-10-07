/*
  Warnings:

  - You are about to drop the `_CardAbilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardAbilities" DROP CONSTRAINT "_CardAbilities_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardAbilities" DROP CONSTRAINT "_CardAbilities_B_fkey";

-- DropTable
DROP TABLE "_CardAbilities";

-- CreateTable
CREATE TABLE "CardAbility" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "abilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardAbility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardAbility" ADD CONSTRAINT "CardAbility_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardAbility" ADD CONSTRAINT "CardAbility_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
