/*
  Warnings:

  - You are about to drop the column `targetAttributes` on the `AbilityInstance` table. All the data in the column will be lost.
  - You are about to drop the column `targetVariants` on the `AbilityInstance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AbilityInstance" DROP COLUMN "targetAttributes",
DROP COLUMN "targetVariants";
