/*
  Warnings:

  - You are about to drop the `animalcurrentfood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `animalcurrentfood` DROP FOREIGN KEY `animalcurrentfood_ibfk_1`;

-- DropForeignKey
ALTER TABLE `animalcurrentfood` DROP FOREIGN KEY `animalcurrentfood_ibfk_2`;

-- DropTable
DROP TABLE `animalcurrentfood`;
