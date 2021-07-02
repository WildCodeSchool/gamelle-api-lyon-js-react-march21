/*
  Warnings:

  - Added the required column `requestSentAt` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `statistics` ADD COLUMN `requestSentAt` DATETIME(3) NOT NULL;
