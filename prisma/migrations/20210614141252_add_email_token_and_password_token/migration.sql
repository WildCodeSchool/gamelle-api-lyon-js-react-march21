-- AlterTable
ALTER TABLE `User` ADD COLUMN `confirmedEmailToken` VARCHAR(255),
    ADD COLUMN `resetPasswordToken` VARCHAR(255);
