-- Additional demo data for CDO Café Nomination System
-- Run this after importing the main schema

USE cdo_cafe_nomination;

-- Insert more sample users
INSERT INTO users (name, email, password) VALUES
('Maria Santos', 'maria.santos@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Juan Dela Cruz', 'juan.delacruz@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Ana Rodriguez', 'ana.rodriguez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Carlos Mendoza', 'carlos.mendoza@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert more sample cafés
INSERT INTO cafes (cafe_name, address, latitude, longitude, facebook_link, image_path) VALUES
('Kapehan sa CDO', 'Nazareth, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/kapehansacdo', 'uploads/kapehan.jpg'),
('Coffee Corner', 'Divisoria, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/coffeecorner', 'uploads/coffee-corner.jpg'),
('Brew Master', 'Carmen, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/brewmaster', 'uploads/brew-master.jpg'),
('Café Luna', 'Kauswagan, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/cafeluna', 'uploads/cafe-luna.jpg'),
('The Coffee House', 'Lapasan, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/thecoffeehouse', 'uploads/coffee-house.jpg');

-- Insert more sample nominations
INSERT INTO nominations (user_id, cafe_id, reason, status) VALUES
(1, 6, 'Amazing local coffee with authentic Filipino taste!', 'approved'),
(1, 7, 'Great atmosphere for studying and working.', 'approved'),
(2, 6, 'Best barista in CDO!', 'approved'),
(2, 8, 'Love their specialty drinks and pastries.', 'approved'),
(3, 7, 'Perfect for coffee dates.', 'approved'),
(3, 9, 'Excellent customer service and quality coffee.', 'approved'),
(4, 8, 'Cozy place with great WiFi.', 'approved'),
(4, 10, 'Best coffee in the area!', 'approved'),
(1, 9, 'Amazing view and great coffee.', 'approved'),
(2, 10, 'Highly recommended for coffee lovers!', 'approved'),
(3, 6, 'Great place to relax and enjoy coffee.', 'pending'),
(4, 7, 'Love the ambiance and friendly staff.', 'pending');

-- Update some cafés with more realistic coordinates
UPDATE cafes SET latitude = 8.4808, longitude = 124.6479 WHERE cafe_id = 1;
UPDATE cafes SET latitude = 8.4810, longitude = 124.6480 WHERE cafe_id = 2;
UPDATE cafes SET latitude = 8.4806, longitude = 124.6478 WHERE cafe_id = 3;
UPDATE cafes SET latitude = 8.4812, longitude = 124.6482 WHERE cafe_id = 4;
UPDATE cafes SET latitude = 8.4804, longitude = 124.6476 WHERE cafe_id = 5;
UPDATE cafes SET latitude = 8.4814, longitude = 124.6484 WHERE cafe_id = 6;
UPDATE cafes SET latitude = 8.4802, longitude = 124.6474 WHERE cafe_id = 7;
UPDATE cafes SET latitude = 8.4816, longitude = 124.6486 WHERE cafe_id = 8;
UPDATE cafes SET latitude = 8.4800, longitude = 124.6472 WHERE cafe_id = 9;
UPDATE cafes SET latitude = 8.4818, longitude = 124.6488 WHERE cafe_id = 10;

-- Create some additional admin accounts
INSERT INTO admin (username, password) VALUES
('moderator', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('supervisor', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Display summary
SELECT 'Demo data inserted successfully!' as message;
SELECT COUNT(*) as total_cafes FROM cafes;
SELECT COUNT(*) as total_nominations FROM nominations;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_admins FROM admin;
