/*
  Warnings:

  - A unique constraint covering the columns `[gamelleId]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gamelleId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gamelleId` to the `Breed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gamelleId` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `breed` ADD COLUMN `gamelleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `food` ADD COLUMN `gamelleId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Breed.gamelleId_unique` ON `Breed`(`gamelleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Food.gamelleId_unique` ON `Food`(`gamelleId`);
