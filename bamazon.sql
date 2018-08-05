DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 150, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Electronics", 120, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone case", "Accessory", 10, 1500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Home", 30, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Home", 35, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fish tank", "Aquarium", 100, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Clothing", 20, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shirt", "Clothing", 10, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 5, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("100G Filter", "Aquarium", 250, 5);

SELECT * FROM products;