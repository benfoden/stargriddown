/*
  Warnings:

  - You are about to drop the column `variants` on the `Deck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "variants",
ADD COLUMN     "type" TEXT;
