/*
  Warnings:

  - You are about to drop the column `userId` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `animalCategoryName` on the `animalcategory` table. All the data in the column will be lost.
  - You are about to drop the column `breedName` on the `breed` table. All the data in the column will be lost.
  - You are about to drop the column `gamelleId` on the `breed` table. All the data in the column will be lost.
  - You are about to drop the column `speciesId` on the `breed` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `foodName` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `gamelleId` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `priceTimeStamp` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `foodTypeName` on the `foodtype` table. All the data in the column will be lost.
  - You are about to drop the column `priceTimeStamp` on the `history` table. All the data in the column will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `AnimalCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FoodType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AnimalCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Breed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FoodType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultedAt` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `food_ibfk_1`;

-- DropForeignKey
ALTER TABLE `animal` DROP FOREIGN KEY `animal_ibfk_1`;

-- DropIndex
DROP INDEX `Food.gamelleId_unique` ON `food`;

-- DropIndex
DROP INDEX `Breed.gamelleId_unique` ON `breed`;

-- DropIndex
DROP INDEX `FoodType.foodTypeName_unique` ON `foodtype`;

-- DropIndex
DROP INDEX `AnimalCategory.animalCategoryName_unique` ON `animalcategory`;

-- DropIndex
DROP INDEX `Food.foodName_unique` ON `food`;

-- DropIndex
DROP INDEX `Breed.breedName_unique` ON `breed`;

-- AlterTable
ALTER TABLE `animal` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `animalcategory` DROP COLUMN `animalCategoryName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `breed` DROP COLUMN `breedName`,
    DROP COLUMN `gamelleId`,
    DROP COLUMN `speciesId`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `food` DROP COLUMN `brandId`,
    DROP COLUMN `foodName`,
    DROP COLUMN `gamelleId`,
    DROP COLUMN `priceTimeStamp`,
    ADD COLUMN `amazonLastpriceTimeStamp` DATETIME(3),
    ADD COLUMN `brand` VARCHAR(255) NOT NULL,
    ADD COLUMN `croquettelandLastpriceTimeStamp` DATETIME(3),
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `zooplusLastpriceTimeStamp` DATETIME(3);

-- AlterTable
ALTER TABLE `foodtype` DROP COLUMN `foodTypeName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `history` DROP COLUMN `priceTimeStamp`,
    ADD COLUMN `consultedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `brand`;

-- CreateIndex
CREATE UNIQUE INDEX `AnimalCategory.name_unique` ON `AnimalCategory`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Breed.name_unique` ON `Breed`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `FoodType.name_unique` ON `FoodType`(`name`);

-- AddForeignKey
ALTER TABLE `Animal` ADD FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
