-- ============================================================
--  School Management API — Database Schema
--  Run this file to create the database and table from scratch
-- ============================================================

-- 1. Create & select the database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- 2. Create the schools table
CREATE TABLE IF NOT EXISTS schools (
  id        INT           NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(500)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. (Optional) seed data for quick testing
-- INSERT INTO schools (name, address, latitude, longitude) VALUES
--   ('Greenwood High',    '123 Oak Street, New York',         40.7128,  -74.0060),
--   ('Sunrise Academy',  '456 Maple Ave, Los Angeles',        34.0522, -118.2437),
--   ('Blue Ridge School','789 Pine Rd, Chicago',              41.8781,  -87.6298);

