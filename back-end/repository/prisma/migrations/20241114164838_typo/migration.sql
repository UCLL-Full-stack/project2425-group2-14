/*
  Warnings:

  - You are about to drop the column `Category` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Nutritionlabel` table. All the data in the column will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salts` to the `Nutritionlabel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "Category",
ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "Nutritionlabel" DROP COLUMN "salt",
ADD COLUMN     "salts" DOUBLE PRECISION NOT NULL;
