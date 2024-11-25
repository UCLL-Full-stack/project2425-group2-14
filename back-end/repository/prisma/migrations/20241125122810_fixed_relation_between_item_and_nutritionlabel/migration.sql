/*
  Warnings:

  - A unique constraint covering the columns `[nutritionlabelId]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nutritionlabelId` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_nutritionlabelId_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "nutritionlabelId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "items_nutritionlabelId_key" ON "items"("nutritionlabelId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_nutritionlabelId_fkey" FOREIGN KEY ("nutritionlabelId") REFERENCES "nutritionlabels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
