/*
  Warnings:

  - You are about to drop the column `isUsable` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `qVar` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `tVar` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `xVar` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `yVar` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `zVar` on the `Ability` table. All the data in the column will be lost.
  - Made the column `variant` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ability" DROP COLUMN "isUsable",
DROP COLUMN "qVar",
DROP COLUMN "shortName",
DROP COLUMN "tVar",
DROP COLUMN "xVar",
DROP COLUMN "yVar",
DROP COLUMN "zVar",
ADD COLUMN     "cardCount" INTEGER,
ADD COLUMN     "control" INTEGER,
ADD COLUMN     "targetType" TEXT,
ADD COLUMN     "targetVariants" TEXT;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "logic" TEXT,
ADD COLUMN     "ruleSet" TEXT,
ADD COLUMN     "targetAttributes" TEXT,
ADD COLUMN     "targetType" TEXT,
ADD COLUMN     "targetVariants" TEXT,
ALTER COLUMN "variant" SET NOT NULL,
ALTER COLUMN "variant" SET DEFAULT 'digital';

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "ruleSet" TEXT;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "ruleSet" TEXT;
