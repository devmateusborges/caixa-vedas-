/*
  Warnings:

  - The `amount` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `amount`,
    ADD COLUMN `amount` INTEGER NULL;
