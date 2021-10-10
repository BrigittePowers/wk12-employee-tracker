CREATE DATABASE employee_db;

USE employee_db;

SELECT DATABASE(); -- show where we are

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL -- dept name
);


CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, -- title 
    salary DECIMAL, -- salary
    department_id INT -- dept role
);


CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, -- emp first name
    last_name VARCHAR(30) NOT NULL, -- emp last name
    role_id INT, -- employee role
    manager_id INT -- reference to another employee that is the manager
);

SHOW TABLES; -- display

DESCRIBE department; -- display
DESCRIBE role; -- display
DESCRIBE employee; -- display