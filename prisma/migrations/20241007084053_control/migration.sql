/*
  Warnings:

  - You are about to drop the column `might` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "might",
ADD COLUMN     "control" INTEGER;
