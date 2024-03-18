/*
  Warnings:

  - You are about to drop the column `description` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idShopify]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body_html` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idShopify` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "body_html" TEXT NOT NULL,
ADD COLUMN     "idShopify" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_idShopify_key" ON "Business"("idShopify");
