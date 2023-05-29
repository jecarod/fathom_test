DROP DATABASE if exists fathom_products;
CREATE DATABASE if not exists fathom_products;
use fathom_products;

CREATE TABLE user(
	user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	lastname VARCHAR(100) NOT NULL,	
	email VARCHAR(200)  NOT NULL UNIQUE,
	password VARCHAR(150) NOT NULL,
    is_deleted TINYINT (1) NOT NULL DEFAULT 0    
);

CREATE TABLE product(
		product_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        product_name VARCHAR (100) NOT NULL,
        remarks VARCHAR(500),
        is_deleted TINYINT (1) NOT NULL DEFAULT 0
);

CREATE TABLE product_variation(
	product_variation_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED,
    product_variation_name VARCHAR(100) NOT NULL,
    is_deleted TINYINT (1) NOT NULL DEFAULT 0,
    CONSTRAINT fk_pruduct_id FOREIGN KEY (product_id)
	REFERENCES product (product_id) ON DELETE CASCADE ON UPDATE CASCADE  
);