/*
  Warnings:

  - You are about to drop the `ItemToShoppingcart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemToShoppingcart" DROP CONSTRAINT "ItemToShoppingcart_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemToShoppingcart" DROP CONSTRAINT "ItemToShoppingcart_shoppingcartId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_nutritionlabelId_fkey";

-- DropForeignKey
ALTER TABLE "shoppingcarts" DROP CONSTRAINT "shoppingcarts_userId_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "nutritionlabelId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "shoppingcarts" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "ItemToShoppingcart";

-- AddForeignKey
ALTER TABLE "shoppingcarts" ADD CONSTRAINT "shoppingcarts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_nutritionlabelId_fkey" FOREIGN KEY ("nutritionlabelId") REFERENCES "nutritionlabels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
