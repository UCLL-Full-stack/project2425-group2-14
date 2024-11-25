-- CreateTable
CREATE TABLE "ItemToShoppingcart" (
    "itemId" INTEGER NOT NULL,
    "shoppingcartId" INTEGER NOT NULL,

    CONSTRAINT "ItemToShoppingcart_pkey" PRIMARY KEY ("itemId","shoppingcartId")
);

-- AddForeignKey
ALTER TABLE "ItemToShoppingcart" ADD CONSTRAINT "ItemToShoppingcart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemToShoppingcart" ADD CONSTRAINT "ItemToShoppingcart_shoppingcartId_fkey" FOREIGN KEY ("shoppingcartId") REFERENCES "shoppingcarts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
