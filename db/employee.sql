DROP DATABASE IF EXISTS employee_db; -- for testing purposes
CREATE DATABASE employee_db;
USE employee_db;

-- ==============================
--       CREATE TABLES
-- ==============================

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL -- dept name
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL, -- title 
    salary DECIMAL (10, 2) NOT NULL, -- salary
    tips  BOOLEAN, -- are they on tip roll?
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE -- if dept is deleted, remove roles under that dept
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, -- emp first name
    last_name VARCHAR(30) NOT NULL, -- emp last name
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,-- if role is deleted, unassign employee
    manager_id INT, -- ref to another employee ID that is the manager
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL -- unassign from a manager if manager is fired
);