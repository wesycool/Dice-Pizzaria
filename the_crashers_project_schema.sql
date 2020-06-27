DROP DATABASE IF EXISTS the_crashers_db;
CREATE database the_crashers_db;

USE the_crashers_db;

CREATE TABLE client_login (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_name VARCHAR(30),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  address VARCHAR(50),
  password VARCHAR(10)
);

CREATE TABLE staff_login (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_name VARCHAR(30),
  password VARCHAR(10),
  first_name VARCHAR(30),
  last_name VARCHAR(30)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255),
  ingredient VARCHAR(255),
  size VARCHAR(10),
  price DECIMAL(5,2)
);

-- preparing, baking, packing, ready, delivering, delivered 
CREATE TABLE order (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  current_order_status VARCHAR(30),
  transaction_id int foreign key,
  product_id int foreign key,
  quantity int
);
-- id    status   staff_id  product_id   bill_id
-- 1     pending     1         2             1
-- 2     pending     1         5             1
-- 3     pending     2         8             1

CREATE Table transactions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  client_id int,
  staff_id int
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name DECIMAL,
  role_id INT,
  manager_id INT
);
