DROP DATABASE IF EXISTS employee_db; -- for testing purposes
CREATE DATABASE employee_db;

USE employee_db;

SELECT DATABASE(); -- show where we are


-- ==============================
--       CREATE TABLES
-- ==============================

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL -- dept name
);


CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL, -- title 
    salary DECIMAL (10, 2) NOT NULL, -- salary
    tips  BOOLEAN, -- are they on tip roll?
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    INT NOT NULL -- dept role id
);


CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, -- emp first name
    last_name VARCHAR(30) NOT NULL, -- emp last name
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    INT NOT NULL, -- employee role
    manager_id INT -- reference to another employee ID that is the manager
);


-- ==============================
-- CREATE DEPARTMENTS AND ROLES
-- ==============================

INSERT INTO department (name)
VALUES ('Front of House'), -- server, hostess, busser, bartender
        ('Back of House'), -- line, cook, prep
        ('Management'), -- head chef, assistant manager, gm
        ('Executive'); -- human resources, financial officer, owner

INSERT INTO role (title, salary, tips, department_id)
VALUES ('Server', 20800, true, 1),
        ('Hostess', 26000, true, 1),
        ('Busser', 16640, true, 1), 
        ('Bartender', 27040, true, 1),

        ('Line', 20800, false, 2),
        ('Cook', 26000, false, 2),
        ('Prep', 16640, true, 2),

        ('Head Chef', 33280, false, 3),
        ('Ast. Manager', 37440, false, 3),
        ('General Manager', 62400, false, 3),

        ('Human Resources', 45000, false, 4),
        ('Financial Officer', 47500, false, 4),
        ('Owner', 153000, false, 4);


SHOW TABLES; -- display

SELECT * FROM department;
SELECT * FROM role;