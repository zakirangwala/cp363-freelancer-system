-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `cart_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `cartitem_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `cartitem_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `order_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `order_ibfk_2`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `orderitem_ibfk_1`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `orderitem_ibfk_2`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `orderitem_ibfk_3`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `payment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Service` DROP FOREIGN KEY `service_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ServiceReview` DROP FOREIGN KEY `servicereview_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ServiceReview` DROP FOREIGN KEY `servicereview_ibfk_2`;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_freelancerID_fkey` FOREIGN KEY (`freelancerID`) REFERENCES `Freelancer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartID_fkey` FOREIGN KEY (`cartID`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_freelancerID_fkey` FOREIGN KEY (`freelancerID`) REFERENCES `Freelancer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_serviceID_fkey` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartID_fkey` FOREIGN KEY (`cartID`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_serviceID_fkey` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceReview` ADD CONSTRAINT `ServiceReview_serviceID_fkey` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceReview` ADD CONSTRAINT `ServiceReview_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Cart` RENAME INDEX `userID` TO `Cart_userID_idx`;

-- RenameIndex
ALTER TABLE `CartItem` RENAME INDEX `cartID` TO `CartItem_cartID_idx`;

-- RenameIndex
ALTER TABLE `CartItem` RENAME INDEX `serviceID` TO `CartItem_serviceID_idx`;

-- RenameIndex
ALTER TABLE `Order` RENAME INDEX `cartID` TO `Order_cartID_idx`;

-- RenameIndex
ALTER TABLE `Order` RENAME INDEX `userID` TO `Order_userID_idx`;

-- RenameIndex
ALTER TABLE `OrderItem` RENAME INDEX `freelancerID` TO `OrderItem_freelancerID_idx`;

-- RenameIndex
ALTER TABLE `OrderItem` RENAME INDEX `orderID` TO `OrderItem_orderID_idx`;

-- RenameIndex
ALTER TABLE `OrderItem` RENAME INDEX `serviceID` TO `OrderItem_serviceID_idx`;

-- RenameIndex
ALTER TABLE `Payment` RENAME INDEX `orderID` TO `Payment_orderID_idx`;

-- RenameIndex
ALTER TABLE `Service` RENAME INDEX `freelancerID` TO `Service_freelancerID_idx`;

-- RenameIndex
ALTER TABLE `ServiceReview` RENAME INDEX `serviceID` TO `ServiceReview_serviceID_idx`;

-- RenameIndex
ALTER TABLE `ServiceReview` RENAME INDEX `userID` TO `ServiceReview_userID_idx`;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `email` TO `User_email_key`;
