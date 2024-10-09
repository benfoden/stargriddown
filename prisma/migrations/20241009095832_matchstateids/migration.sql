/*
  Warnings:

  - Added the required column `player1Id` to the `MatchState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchState" ADD COLUMN     "player1Id" TEXT NOT NULL,
ADD COLUMN     "player2Id" TEXT;
