/*
  Warnings:

  - You are about to drop the column `name` on the `animalcategory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `breed` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `foodtype` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[animalCategoryName]` on the table `AnimalCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[breedName]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandName]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[foodTypeName]` on the table `FoodType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[foodName]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animalCategoryName` to the `AnimalCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandName` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breedName` to the `Breed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodName` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodTypeName` to the `FoodType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AnimalCategory.name_unique` ON `animalcategory`;

-- DropIndex
DROP INDEX `Brand.name_unique` ON `brand`;

-- DropIndex
DROP INDEX `Food.name_unique` ON `food`;

-- DropIndex
DROP INDEX `FoodType.name_unique` ON `foodtype`;

-- DropIndex
DROP INDEX `Breed.name_unique` ON `breed`;

-- AlterTable
ALTER TABLE `animalcategory` DROP COLUMN `name`,
    ADD COLUMN `animalCategoryName` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `brand` DROP COLUMN `name`,
    ADD COLUMN `brandName` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `breed` DROP COLUMN `name`,
    ADD COLUMN `breedName` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `food` DROP COLUMN `name`,
    ADD COLUMN `amazonPrice` DECIMAL(10, 2),
    ADD COLUMN `croquettelandPrice` DECIMAL(10, 2),
    ADD COLUMN `foodName` VARCHAR(255) NOT NULL,
    ADD COLUMN `image` VARCHAR(255),
    ADD COLUMN `priceTimeStamp` DATETIME(3),
    ADD COLUMN `zooplusPrice` DECIMAL(10, 2),
    MODIFY `brandId` INTEGER,
    MODIFY `foodTypeId` INTEGER,
    MODIFY `animalCategoryId` INTEGER;

-- AlterTable
ALTER TABLE `foodtype` DROP COLUMN `name`,
    ADD COLUMN `foodTypeName` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255),
    `userId` INTEGER NOT NULL,
    `animalCategoryId` INTEGER,
    `foodId` INTEGER,
    `breedId` INTEGER,

    UNIQUE INDEX `Animal.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `priceTimeStamp` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,
    `favoriteId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `AnimalCategory.animalCategoryName_unique` ON `AnimalCategory`(`animalCategoryName`);

-- CreateIndex
CREATE UNIQUE INDEX `Breed.breedName_unique` ON `Breed`(`breedName`);

-- CreateIndex
CREATE UNIQUE INDEX `Brand.brandName_unique` ON `Brand`(`brandName`);

-- CreateIndex
CREATE UNIQUE INDEX `FoodType.foodTypeName_unique` ON `FoodType`(`foodTypeName`);

-- CreateIndex
CREATE UNIQUE INDEX `Food.foodName_unique` ON `Food`(`foodName`);

-- AddForeignKey
ALTER TABLE `Animal` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD FOREIGN KEY (`animalCategoryId`) REFERENCES `AnimalCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD FOREIGN KEY (`breedId`) REFERENCES `Breed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`foodId`) REFERENCES `Favorite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
