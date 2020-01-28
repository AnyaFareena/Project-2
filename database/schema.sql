DROP DATABASE IF EXISTS `quiz_journey`;
CREATE DATABASE `quiz_journey`;

USE `quiz_journey`;

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INTEGER NOT NULL auto_increment,
    `name` VARCHAR(255),
    `token` VARCHAR(255),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Characters` (
    `id` INTEGER NOT NULL auto_increment,
    `name` VARCHAR(255),
    `points` INTEGER DEFAULT 0,
    `user_id` INTEGER,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Locations` (
    `id` INTEGER NOT NULL auto_increment,
    `name` VARCHAR(255),
    `image` VARCHAR(255),
    `category` VARCHAR(255),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;
