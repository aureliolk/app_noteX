/*
  Warnings:

  - Added the required column `bgcolor` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notes` ADD COLUMN `bgcolor` VARCHAR(191) NOT NULL;
