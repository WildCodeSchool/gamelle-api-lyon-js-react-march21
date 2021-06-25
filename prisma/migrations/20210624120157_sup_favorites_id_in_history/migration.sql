/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `history` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_ibfk_3`;

-- AlterTable
ALTER TABLE `history` DROP COLUMN `favoriteId`;
