/*
  Warnings:

  - You are about to drop the `_ItemToShoppingcart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToShoppingcart" DROP CONSTRAINT "_ItemToShoppingcart_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToShoppingcart" DROP CONSTRAINT "_ItemToShoppingcart_B_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "itemId" INTEGER,
ADD COLUMN     "shoppingcartId" INTEGER;

-- DropTable
DROP TABLE "_ItemToShoppingcart";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_shoppingcartId_fkey" FOREIGN KEY ("shoppingcartId") REFERENCES "shoppingcarts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
