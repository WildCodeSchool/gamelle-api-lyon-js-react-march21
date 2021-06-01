/*
  Warnings:

  - Added the required column `speciesId` to the `Breed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `breed` ADD COLUMN `speciesId` INTEGER NOT NULL;
