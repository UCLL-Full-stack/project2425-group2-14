/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shoppingcarts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_itemId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_nutritionlabelId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_shoppingcartId_fkey";

-- DropForeignKey
ALTER TABLE "shoppingcarts" DROP CONSTRAINT "shoppingcarts_userId_fkey";

-- DropTable
DROP TABLE "items";

-- DropTable
DROP TABLE "shoppingcarts";

-- CreateTable
CREATE TABLE "Shoppingcart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Shoppingcart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pathToImage" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "nutritionlabelId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Shoppingcart" ADD CONSTRAINT "Shoppingcart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_nutritionlabelId_fkey" FOREIGN KEY ("nutritionlabelId") REFERENCES "nutritionlabels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_B_fkey" FOREIGN KEY ("B") REFERENCES "Shoppingcart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
