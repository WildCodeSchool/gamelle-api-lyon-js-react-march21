-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_ibfk_3`;

-- DropIndex
DROP INDEX `favoriteId` ON `history`;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`favoriteId`) REFERENCES `Favorite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
