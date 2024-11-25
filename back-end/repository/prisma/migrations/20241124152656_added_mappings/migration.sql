/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shoppingcart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_nutritionlabelId_fkey";

-- DropForeignKey
ALTER TABLE "Shoppingcart" DROP CONSTRAINT "Shoppingcart_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToShoppingcart" DROP CONSTRAINT "_ItemToShoppingcart_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToShoppingcart" DROP CONSTRAINT "_ItemToShoppingcart_B_fkey";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Shoppingcart";

-- CreateTable
CREATE TABLE "shoppingcarts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "shoppingcarts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pathToImage" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "nutritionlabelId" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shoppingcarts" ADD CONSTRAINT "shoppingcarts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_nutritionlabelId_fkey" FOREIGN KEY ("nutritionlabelId") REFERENCES "nutritionlabels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_B_fkey" FOREIGN KEY ("B") REFERENCES "shoppingcarts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
