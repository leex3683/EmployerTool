const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
// Import and require express
const express = require("express");
// Express middleware
const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
//TODO - hide credentials
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "employer_db",
  },
  console.log(`Connected to the employer_db database.`)
);

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "View all departments":
          db.query(
            `
          SELECT * 
          FROM department`,
            function (err, result, fields) {
              if (err) throw err;
              console.table(result);
            }
          );

          break;
        case "View all roles":
          db.query(
            `
          SELECT A.id, A.title, B.name, A.salary 
          FROM role A 
          JOIN department B ON A.department_id=B.id;`,
            function (err, result, fields) {
              if (err) throw err;
              console.table(result);
            }
          );

          break;
        case "View all employees":
          db.query(
            `
          SELECT A.id, A.first_name, A.last_name, C.title, C.salary, D.name as department, CONCAT(B.first_name, " ", B.last_name) AS manager_name
          FROM employee A
          LEFT JOIN employee B ON A.manager_id= B.id
          LEFT JOIN role C on C.id = A.role_id
          LEFT JOIN department D ON D.id = C.department_id;`,
            function (err, result, fields) {
              if (err) throw err;
              console.table(result);
            }
          );

          break;
        case "Add a department":
          inquirer.prompt([
            {
              type: "input",
              message: "\n\r What is the name of the new department?",
              name: "newDepartment",
            }
            ]).then((response) => {
                db.query(
                `
              INSERT INTO department(name) VALUES (?)`, response.newDepartment,
                function (err, result, fields) {
                  if (err) throw err;
                  console.table("Department Added");
                }
              )}
              )
          
          break;
        case "Add a role":
            inquirer.prompt([
                {
                  type: "input",
                  message: "\n\r What is the name of the new role?",
                  name: "newRole",
                }
                ]).then((response) => {
                    db.query(
                    `
                  INSERT INTO role (name) VALUES (?)`, response.newRole,
                    function (err, result, fields) {
                      if (err) throw err;
                      console.table("Role Added");
                    }
                  )}
                  )

          break;
        case "Add an employee":
            inquirer.prompt([
                {
                  type: "input",
                  message: "\n\r What is the ee's first name?",
                  name: "eFName",
                },
                {
                  type: "input",
                  message: "\n\r What is the ee's last name?",
                  name: "eLName",
                },
                {
                    type: "input",
                    message: "\n\r What is the ee's role?",
                    name: "eRole",
                    choices: [
                        "View all departments",
                        "View all roles",
                        "View all employees",
                        "Add a department",
                        "Add a role",
                        "Add an employee",
                        "Update an employee role",
                      ],
                  },
                  {
                    type: "input",
                    message: "\n\r Who is the ee's manager?",
                    name: "eManager",
                  },
                ]).then((response) => {
                    db.query(
                    `
                  INSERT INTO employee (first_name, last_name) VALUES (?)`, `${response.eFName},${response.eLName}`,
                    function (err, result, fields) {
                      if (err) throw err;
                      console.table("Employee Added");
                    }
                  )}
                  )
          break;
        case "Update an employee role":
          console.log("switch");
          break;
        default:
          console.log("switch");
      }
    });
}

// Function call to initialize app
init();
