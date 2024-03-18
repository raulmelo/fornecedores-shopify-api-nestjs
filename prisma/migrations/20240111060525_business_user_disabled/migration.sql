-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;
