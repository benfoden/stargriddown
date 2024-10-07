/*
  Warnings:

  - You are about to drop the column `abilities` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `abilitiesArr` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `CardAbility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CardAbility" DROP CONSTRAINT "CardAbility_abilityId_fkey";

-- DropForeignKey
ALTER TABLE "CardAbility" DROP CONSTRAINT "CardAbility_cardId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "abilities",
DROP COLUMN "abilitiesArr";

-- DropTable
DROP TABLE "CardAbility";

-- CreateTable
CREATE TABLE "_CardAbilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardAbilities_AB_unique" ON "_CardAbilities"("A", "B");

-- CreateIndex
CREATE INDEX "_CardAbilities_B_index" ON "_CardAbilities"("B");

-- AddForeignKey
ALTER TABLE "_CardAbilities" ADD CONSTRAINT "_CardAbilities_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardAbilities" ADD CONSTRAINT "_CardAbilities_B_fkey" FOREIGN KEY ("B") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
