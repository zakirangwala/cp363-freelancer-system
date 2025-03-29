-- Create CartItem table
CREATE TABLE IF NOT EXISTS `CartItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cartID` int NOT NULL,
  `serviceID` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cartID` (`cartID`),
  KEY `serviceID` (`serviceID`),
  CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `Cart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`serviceID`) REFERENCES `Service` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Add items column to Cart table
ALTER TABLE `Cart` ADD COLUMN `items` JSON DEFAULT NULL; 