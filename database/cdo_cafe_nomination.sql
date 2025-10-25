-- CDO Café Nomination & Map Explorer Database Schema
-- Created for MySQL/MariaDB

CREATE DATABASE IF NOT EXISTS cdo_cafe_nomination;
USE cdo_cafe_nomination;

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cafes table
CREATE TABLE cafes (
    cafe_id INT AUTO_INCREMENT PRIMARY KEY,
    cafe_name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    facebook_link VARCHAR(255) NULL,
    image_path VARCHAR(255) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_cafe_location (cafe_name, latitude, longitude)
);

-- Nominations table
CREATE TABLE nominations (
    nomination_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cafe_id INT NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_cafe (user_id, cafe_id)
);

-- Admin table
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
INSERT INTO admin (username, password) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Sample data
INSERT INTO cafes (cafe_name, address, latitude, longitude, facebook_link, image_path) VALUES
('Brew & Beans Coffee', 'Corrales Avenue, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/brewbeanscoffee', 'uploads/brew-beans.jpg'),
('Coffee Project', 'Centrio Mall, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/coffeeproject', 'uploads/coffee-project.jpg'),
('Starbucks CDO', 'SM CDO Downtown Premier, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/starbucksph', 'uploads/starbucks.jpg'),
('Café de Oro', 'Velez Street, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/cafedeoro', 'uploads/cafe-de-oro.jpg'),
('The Coffee Bean & Tea Leaf', 'Ayala Centrio, Cagayan de Oro', 8.4808, 124.6479, 'https://facebook.com/coffeebeanph', 'uploads/coffee-bean.jpg');

-- Sample nominations
INSERT INTO nominations (user_id, cafe_id, reason, status) VALUES
(1, 1, 'Best coffee in CDO! Amazing atmosphere and friendly staff.', 'approved'),
(1, 2, 'Great place to work remotely. Good WiFi and comfortable seating.', 'approved'),
(2, 1, 'Love their specialty drinks and pastries.', 'approved'),
(2, 3, 'Convenient location and consistent quality.', 'approved'),
(3, 4, 'Local favorite with authentic Filipino coffee.', 'approved'),
(3, 5, 'Perfect for meetings and casual hangouts.', 'approved');

-- Create indexes for better performance
CREATE INDEX idx_cafes_location ON cafes(latitude, longitude);
CREATE INDEX idx_nominations_status ON nominations(status);
CREATE INDEX idx_nominations_created ON nominations(created_at);
