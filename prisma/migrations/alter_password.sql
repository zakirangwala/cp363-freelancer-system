-- Modify password column length without dropping data
ALTER TABLE `User` MODIFY COLUMN `password` VARCHAR(255) NOT NULL; 