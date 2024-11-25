-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_nutritionlabelId_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "nutritionlabelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_nutritionlabelId_fkey" FOREIGN KEY ("nutritionlabelId") REFERENCES "nutritionlabels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
