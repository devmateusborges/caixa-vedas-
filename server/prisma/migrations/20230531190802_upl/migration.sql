/*
  Warnings:

  - You are about to drop the column `birthDate` on the `clients` table. All the data in the column will be lost.
  - Added the required column `credits` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `birthDate`,
    ADD COLUMN `credits` DOUBLE NOT NULL;
