/*
  Warnings:

  - You are about to drop the column `expirationDate` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturingDate` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `hiringDate` on the `sellers` table. All the data in the column will be lost.
  - You are about to drop the column `startContractDate` on the `suppliers` table. All the data in the column will be lost.
  - Added the required column `amount` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `expirationDate`,
    DROP COLUMN `manufacturingDate`,
    ADD COLUMN `amount` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `sellers` DROP COLUMN `hiringDate`;

-- AlterTable
ALTER TABLE `suppliers` DROP COLUMN `startContractDate`;
