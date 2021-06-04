/*
  Warnings:

  - You are about to drop the column `userId` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `animalCategoryName` on the `AnimalCategory` table. All the data in the column will be lost.
  - You are about to drop the column `brandName` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `breedName` on the `Breed` table. All the data in the column will be lost.
  - You are about to drop the column `foodName` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `priceTimeStamp` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `foodTypeName` on the `FoodType` table. All the data in the column will be lost.
  - You are about to drop the column `priceTimeStamp` on the `History` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `AnimalCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FoodType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AnimalCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Breed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FoodType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultedAt` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Animal` DROP FOREIGN KEY `Animal_ibfk_1`;

-- DropIndex
DROP INDEX `FoodType.foodTypeName_unique` ON `FoodType`;

-- DropIndex
DROP INDEX `AnimalCategory.animalCategoryName_unique` ON `AnimalCategory`;

-- DropIndex
DROP INDEX `Food.foodName_unique` ON `Food`;

-- DropIndex
DROP INDEX `Brand.brandName_unique` ON `Brand`;

-- DropIndex
DROP INDEX `Breed.breedName_unique` ON `Breed`;

-- AlterTable
ALTER TABLE `Animal` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `AnimalCategory` DROP COLUMN `animalCategoryName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Brand` DROP COLUMN `brandName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Breed` DROP COLUMN `breedName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Food` DROP COLUMN `foodName`,
    DROP COLUMN `priceTimeStamp`,
    ADD COLUMN `amazonLastpriceTimeStamp` DATETIME(3),
    ADD COLUMN `croquettelandLastpriceTimeStamp` DATETIME(3),
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `zooplusLastpriceTimeStamp` DATETIME(3);

-- AlterTable
ALTER TABLE `FoodType` DROP COLUMN `foodTypeName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `History` DROP COLUMN `priceTimeStamp`,
    ADD COLUMN `consultedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AnimalCategory.name_unique` ON `AnimalCategory`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Breed.name_unique` ON `Breed`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Brand.name_unique` ON `Brand`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `FoodType.name_unique` ON `FoodType`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Food.name_unique` ON `Food`(`name`);

-- AddForeignKey
ALTER TABLE `Animal` ADD FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
