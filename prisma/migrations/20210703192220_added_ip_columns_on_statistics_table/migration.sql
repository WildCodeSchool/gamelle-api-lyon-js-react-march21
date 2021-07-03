-- AlterTable
ALTER TABLE `statistics` ADD COLUMN `ipv4Address` VARCHAR(255),
    ADD COLUMN `ipv6Address` VARCHAR(255);
