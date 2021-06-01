/*
  Warnings:

  - Added the required column `gamelleId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamelleId` to the `Breed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamelleId` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brand` ADD COLUMN `gamelleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `breed` ADD COLUMN `gamelleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `food` ADD COLUMN `gamelleId` INTEGER NOT NULL;
