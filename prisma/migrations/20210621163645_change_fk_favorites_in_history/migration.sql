-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_ibfk_3`;

-- AddForeignKey
ALTER TABLE `History` ADD FOREIGN KEY (`userId`) REFERENCES `Favorite`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
