/*
  Warnings:

  - You are about to drop the column `variant` on the `Ability` table. All the data in the column will be lost.
  - Added the required column `type` to the `Ability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ability" DROP COLUMN "variant",
ADD COLUMN     "tVar" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "xVar" TEXT,
ADD COLUMN     "yVar" TEXT,
ADD COLUMN     "zVar" TEXT;
