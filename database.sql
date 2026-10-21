CREATE DATABASE personalityorganics CHARACTER SET utf8mb4;
USE personalityorganics;

CREATE TABLE users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(100),
  gender   VARCHAR(10),
  email    VARCHAR(100),
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE products (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100),
  type     VARCHAR(100),
  notes    VARCHAR(200),
  mood     VARCHAR(50),
  price    INT,
  category VARCHAR(50),
  image    VARCHAR(200)
);

CREATE TABLE orders (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT,
  items      TEXT,
  total      INT,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
