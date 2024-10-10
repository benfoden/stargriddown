-- AlterTable
ALTER TABLE "Ability" ADD COLUMN     "targetType" TEXT;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "rarity" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'operator';

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "variants" TEXT;
