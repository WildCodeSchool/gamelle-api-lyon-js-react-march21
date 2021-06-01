/*
  Warnings:

  - A unique constraint covering the columns `[gamelleId]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gamelleId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gamelleId]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Breed.gamelleId_unique` ON `Breed`(`gamelleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Brand.gamelleId_unique` ON `Brand`(`gamelleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Food.gamelleId_unique` ON `Food`(`gamelleId`);
