/* =========================================================
   AgriRentX Database Schema (PostgreSQL) Faheem 
   ========================================================= */

-- ================= DROP TABLES =================
DROP TABLE IF EXISTS equipments CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE If EXISTS reviews CASCADE 
-- ================= ADMIN TABLE =================
CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ================= VENDOR TABLE =================
CREATE TABLE vendors (
    vendor_id SERIAL PRIMARY KEY,
    shop_name VARCHAR(100) NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile_number CHAR(10) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    id_proof VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Approved, Rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================= CUSTOMER TABLE =================
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile_number CHAR(10) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    id_proof VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Approved, Rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================= EQUIPMENT TABLE =================
CREATE TABLE equipments (
    equipment_id SERIAL PRIMARY KEY,
    vendor_id INT ,

    equipment_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    price_per_day NUMERIC(10,2) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Approved, Rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ================= BOOKINGS TABLE =================
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    equipment_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Active, Completed, Cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipments(equipment_id) ON DELETE CASCADE
);

-- ================= REVIEWS TABLE =================
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);
