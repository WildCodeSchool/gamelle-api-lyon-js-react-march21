/*
  Warnings:

  - You are about to drop the column `foodId` on the `animal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `animal` DROP FOREIGN KEY `animal_ibfk_3`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_ibfk_3`;

-- AlterTable
ALTER TABLE `animal` DROP COLUMN `foodId`;

-- CreateTable
CREATE TABLE `AnimalFavoriteFood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animalId` INTEGER NOT NULL,
    `favoriteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimalCurrentFood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animalId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnimalFavoriteFood` ADD FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimalFavoriteFood` ADD FOREIGN KEY (`favoriteId`) REFERENCES `Favorite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimalCurrentFood` ADD FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimalCurrentFood` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`favoriteId`) REFERENCES `Favorite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
