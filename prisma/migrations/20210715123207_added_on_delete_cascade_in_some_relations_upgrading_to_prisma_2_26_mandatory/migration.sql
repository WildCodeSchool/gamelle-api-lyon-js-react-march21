-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `favorite_ibfk_2`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_ibfk_2`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `rating_ibfk_2`;

-- DropForeignKey
ALTER TABLE `statistics` DROP FOREIGN KEY `statistics_ibfk_1`;

-- AddForeignKey
ALTER TABLE `Favorite` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Statistics` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
