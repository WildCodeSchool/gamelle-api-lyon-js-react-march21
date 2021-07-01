/*
  Warnings:

  - You are about to drop the column `os` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `request` on the `statistics` table. All the data in the column will be lost.
  - Added the required column `requestInfo` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `statistics` DROP COLUMN `os`,
    DROP COLUMN `request`,
    ADD COLUMN `osName` VARCHAR(255),
    ADD COLUMN `requestInfo` VARCHAR(255) NOT NULL;
