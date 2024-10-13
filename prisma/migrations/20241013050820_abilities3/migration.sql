/*
  Warnings:

  - You are about to drop the column `targetType` on the `Ability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ability" DROP COLUMN "targetType",
ADD COLUMN     "targetAttributes" TEXT;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "attributes" TEXT;
