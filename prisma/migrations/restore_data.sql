-- Drop existing tables in correct order (handling foreign key constraints)
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `ServiceReview`;
DROP TABLE IF EXISTS `CartItem`;
DROP TABLE IF EXISTS `Payment`;
DROP TABLE IF EXISTS `OrderItem`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Cart`;
DROP TABLE IF EXISTS `Service`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Freelancer`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `OrderTable`;

SET FOREIGN_KEY_CHECKS = 1;

-- Create User table
CREATE TABLE `User` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

-- Insert User data
INSERT INTO `User` (name, email, password) VALUES
('iAmAShopper', 'iAmAShopper@gmail.com', 'password123'),
('Big Al', 'Al@yahoo.com', 'securePass1'),
('John', 'John@gmail.com', 'passwords'),
('Sarah Connor', 'sarah@gmail.com', 'sarah123'),
('Michael Scott', 'michael@dundermifflin.com', 'worldsbestboss'),
('Jim Halpert', 'jim@pranks.com', 'bearsbeats'),
('Dwight Schrute', 'dwight@beets.com', 'schruteFarms'),
('Pam Beesly', 'pam@artstudio.com', 'pamPaints'),
('Kevin Malone', 'kevin@numbers.com', 'bigmacs'),
('Angela Martin', 'angela@cats.com', 'sprinkles');

-- Create Freelancer table
CREATE TABLE `Freelancer` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    freelancerOrigin VARCHAR(50),
    yearsOfExperience INT
);

-- Insert Freelancer data with origin and experience
INSERT INTO `Freelancer` (name, freelancerOrigin, yearsOfExperience) VALUES
('Timmy', 'United States', 3),
('Billy', 'Canada', 5),
('Big Jake', 'United Kingdom', 7),
('Oscar Martinez', 'Mexico', 10),
('Ryan Howard', 'United States', 2),
('Kelly Kapoor', 'India', 4),
('Stanley Hudson', 'United States', 15),
('Andy Bernard', 'United States', 3),
('Phyllis Vance', 'United States', 8),
('Creed Bratton', 'United States', 20),
('Zaki Rangwala', 'Canada', 6);

-- Create Service table
CREATE TABLE `Service` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    freelancerID INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    FOREIGN KEY (freelancerID) REFERENCES `Freelancer`(id)
);

-- Insert Service data
INSERT INTO `Service` (freelancerID, name, description, price) VALUES
(1, 'Logo Design', 'Professional logo design services', 150),
(2, 'SEO Optimization', 'Improve website SEO ranking', 200),
(3, 'Content Writing', 'Engaging blog and article writing', 100),
(4, 'Business Consulting', 'Helping businesses grow with strategic insights', 300),
(5, 'Social Media Marketing', 'Boost engagement and grow your audience', 250),
(6, 'HR Consulting', 'Improving hiring and retention for companies', 350),
(7, 'Resume Writing', 'Professional resumes that stand out', 120),
(8, 'Guitar Lessons', 'Learn guitar from an experienced instructor', 150),
(9, 'Event Planning', 'Plan and execute memorable events', 275),
(10, 'Creative Writing', 'High-quality fiction and non-fiction content', 220);

-- Create Category table
CREATE TABLE `Category` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Insert Category data
INSERT INTO `Category` (name) VALUES
('Graphic Design'),
('Digital Marketing'),
('Content Creation'),
('Business Strategy'),
('Marketing & Branding'),
('Human Resources'),
('Career Services'),
('Music & Arts'),
('Event Management'),
('Writing & Editing'),
('Other');

-- Create Cart table
CREATE TABLE `Cart` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES `User`(id)
);

-- Insert Cart data (one cart per user)
INSERT INTO `Cart` (userID) VALUES
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- Create Order table
CREATE TABLE `Order` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    cartID INT NOT NULL,
    amount FLOAT NOT NULL,
    FOREIGN KEY (userID) REFERENCES `User`(id),
    FOREIGN KEY (cartID) REFERENCES `Cart`(id)
);

-- Insert Order data
INSERT INTO `Order` (userID, cartID, amount) VALUES
(1, 1, 150.00),
(2, 2, 200.00),
(3, 3, 100.00),
(4, 4, 300.00),
(5, 5, 250.00),
(6, 6, 350.00),
(7, 7, 120.00),
(8, 8, 150.00),
(9, 9, 275.00),
(10, 10, 220.00);

-- Create OrderItem table
CREATE TABLE `OrderItem` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT NOT NULL,
    freelancerID INT NOT NULL,
    serviceID INT NOT NULL,
    FOREIGN KEY (orderID) REFERENCES `Order`(id),
    FOREIGN KEY (freelancerID) REFERENCES `Freelancer`(id),
    FOREIGN KEY (serviceID) REFERENCES `Service`(id)
);

-- Insert OrderItem data
INSERT INTO `OrderItem` (orderID, freelancerID, serviceID) VALUES
(1, 3, 3), (2, 1, 1), (3, 2, 2),
(4, 6, 6), (5, 7, 7), (7, 9, 9),
(8, 10, 10), (9, 5, 5), (10, 4, 4),
(1, 1, 1), (1, 3, 3), (1, 5, 5),
(2, 2, 2), (2, 4, 4), (2, 6, 6),
(3, 3, 3), (3, 5, 5), (3, 7, 7),
(4, 4, 4), (4, 6, 6), (4, 8, 8);

-- Create Payment table
CREATE TABLE `Payment` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    FOREIGN KEY (orderID) REFERENCES `Order`(id)
);

-- Insert Payment data
INSERT INTO `Payment` (orderID, paymentMethod) VALUES
(1, 'Credit Card'),
(2, 'PayPal'),
(3, 'Bank Transfer'),
(4, 'PayPal'),
(5, 'Credit Card'),
(6, 'Crypto Payment'),
(7, 'Google Pay'),
(8, 'Apple Pay'),
(9, 'Debit Card'),
(10, 'PayPal');

-- Create ServiceReview table
CREATE TABLE `ServiceReview` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    serviceID INT NOT NULL,
    userID INT NOT NULL,
    rating INT NOT NULL,
    description VARCHAR(300) NOT NULL,
    FOREIGN KEY (serviceID) REFERENCES `Service`(id),
    FOREIGN KEY (userID) REFERENCES `User`(id)
);

-- Insert ServiceReview data
INSERT INTO `ServiceReview` (serviceID, userID, rating, description) VALUES
(2, 2, 8, 'Great SEO optimization, my website ranking improved'),
(3, 3, 10, 'Amazing content writing service, highly recommended'),
(4, 4, 9, 'Oscar provided great insights into our business'),
(5, 5, 8, 'Ryan helped us double our social media engagement'),
(6, 6, 7, 'Kelly''s HR strategies were helpful, but communication could be better'),
(7, 7, 10, 'Stanley wrote an amazing resume for me!'),
(8, 8, 6, 'Andy''s guitar lessons were fun, but a bit expensive'),
(9, 9, 9, 'Phyllis planned an unforgettable event!'),
(10, 10, 8, 'Creed''s writing was unique and engaging'),
(1, 1, 9, 'Alice created an outstanding logo'),
(2, 1, 8, 'Very helpful SEO optimization!'),
(3, 2, 7, 'John wrote great content for my website!'),
(4, 2, 9, 'The business consulting advice was spot-on!'),
(5, 3, 10, 'Fantastic social media marketing strategy!'),
(6, 4, 6, 'HR consulting could have been better but still helpful'); 