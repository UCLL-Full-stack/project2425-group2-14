/*
  Warnings:

  - You are about to drop the column `shoppingcartId` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_shoppingcartId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "shoppingcartId";

-- CreateTable
CREATE TABLE "_ItemToShoppingcart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToShoppingcart_AB_unique" ON "_ItemToShoppingcart"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToShoppingcart_B_index" ON "_ItemToShoppingcart"("B");

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_B_fkey" FOREIGN KEY ("B") REFERENCES "shoppingcarts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
