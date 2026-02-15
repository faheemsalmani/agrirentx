/* =========================================================
   AgriRentX Database Schema (docs1.sql)
   Includes: Admin, Vendor, Customer, Equipment, Bookings, Feedback
   ========================================================= */

-- Drop existing database if exists and create new
DROP DATABASE IF EXISTS agriculture;
CREATE DATABASE agriculture;
USE agriculture;

/* =========================================================
   1. Admin Table
   ========================================================= */
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

/* =========================================================
   2. Vendors Table
   ========================================================= */
CREATE TABLE vendors (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_name VARCHAR(100) NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile_number CHAR(10) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    id_proof VARCHAR(255) NOT NULL, -- Path to image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   3. Customers Table
   ========================================================= */
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile_number CHAR(10) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    id_proof VARCHAR(255) NOT NULL, -- Path to image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   4. Equipment Table
   ========================================================= */
CREATE TABLE equipments (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- tractor, harvester, etc.
    description TEXT,
    price_per_day DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE CASCADE
);

/* =========================================================
   5. Bookings Table
   ========================================================= */
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    vendor_id INT NOT NULL,
    equipment_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipments(equipment_id) ON DELETE CASCADE
);

/* =========================================================
   6. Feedback Table
   ========================================================= */
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    customer_id INT NOT NULL,
    vendor_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE CASCADE
);
