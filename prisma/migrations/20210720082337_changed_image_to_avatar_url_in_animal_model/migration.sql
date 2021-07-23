/*
  Warnings:

  - You are about to drop the column `image` on the `animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `animal` DROP COLUMN `image`,
    ADD COLUMN `avatarUrl` VARCHAR(255);
