-- CreateEnum
CREATE TYPE "ExtraNames" AS ENUM ('cheese', 'pepperoni', 'mushrooms', 'tomatoes', 'onions', 'jalapenos', 'olives', 'bacon', 'pineapple');

-- CreateTable
CREATE TABLE "Extra" (
    "id" TEXT NOT NULL,
    "name" "ExtraNames" NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
