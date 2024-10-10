/*
  Warnings:

  - You are about to drop the `MatchState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchState" DROP CONSTRAINT "MatchState_matchId_fkey";

-- DropTable
DROP TABLE "MatchState";
