-- AlterTable
ALTER TABLE "Ability" ADD COLUMN     "costControl" INTEGER,
ADD COLUMN     "engages" INTEGER,
ADD COLUMN     "turns" INTEGER;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "costControl" INTEGER,
ALTER COLUMN "type" SET DEFAULT 'operator-1',
ALTER COLUMN "variant" SET DEFAULT 'operator-variant-1';
