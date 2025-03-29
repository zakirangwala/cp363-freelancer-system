-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `freelancerID` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(50) NOT NULL,
    `price` FLOAT NOT NULL,

    INDEX `freelancerID`(`freelancerID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `amount` FLOAT NOT NULL,

    INDEX `cartID`(`cartID`),
    INDEX `userID`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderID` INTEGER NOT NULL,
    `paymentMethod` VARCHAR(50) NOT NULL,

    INDEX `orderID`(`orderID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,

    INDEX `userID`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartID` INTEGER NOT NULL,
    `serviceID` INTEGER NOT NULL,

    INDEX `cartID`(`cartID`),
    INDEX `serviceID`(`serviceID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Freelancer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `freelancerOrigin` VARCHAR(50) NULL,
    `yearsOfExperience` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderID` INTEGER NOT NULL,
    `freelancerID` INTEGER NOT NULL,
    `serviceID` INTEGER NOT NULL,

    INDEX `freelancerID`(`freelancerID`),
    INDEX `orderID`(`orderID`),
    INDEX `serviceID`(`serviceID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `amount` FLOAT NOT NULL,

    INDEX `userID`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(300) NOT NULL,

    INDEX `serviceID`(`serviceID`),
    INDEX `userID`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`freelancerID`) REFERENCES `Freelancer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `Cart`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `Order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `Cart`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `Order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`freelancerID`) REFERENCES `Freelancer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `orderitem_ibfk_3` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderTable` ADD CONSTRAINT `ordertable_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ServiceReview` ADD CONSTRAINT `servicereview_ibfk_1` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ServiceReview` ADD CONSTRAINT `servicereview_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
