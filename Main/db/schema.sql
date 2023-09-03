DROP DATABASE IF EXISTS employer_db;
CREATE DATABASE employer_db;

USE employer_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT, 
  Foreign Key (department_id) REFERENCES department(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL, 
  manager_id INT,
  Foreign Key (role_id) REFERENCES role(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  Foreign Key (manager_id) REFERENCES employee(id)
  /* If the manager terminates where ID exists, set ID to NULL where manager_id exists */
  ON DELETE SET NULL
  ON UPDATE CASCADE
);