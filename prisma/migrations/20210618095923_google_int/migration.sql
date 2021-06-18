/*
  Warnings:

  - You are about to alter the column `googleId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `googleId` INTEGER;
