-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(20);

-- CreateTable
CREATE TABLE `AnimalCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `AnimalCategory.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Breed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Breed.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Brand.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `FoodType.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `foodTypeId` INTEGER NOT NULL,
    `animalCategoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Food.name_unique`(`name`),
    INDEX `brand`(`brandId`),
    INDEX `foodType`(`foodTypeId`),
    INDEX `animalCategory`(`animalCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Food` ADD FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD FOREIGN KEY (`foodTypeId`) REFERENCES `FoodType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD FOREIGN KEY (`animalCategoryId`) REFERENCES `AnimalCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER TABLE `user` RENAME INDEX `user.email_unique` TO `User.email_unique`;

-- AlterIndex
ALTER TABLE `user` RENAME INDEX `user.phone_unique` TO `User.phone_unique`;
