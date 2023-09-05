const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
//Import and require dotenv
require('dotenv').config();
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // TODO: Add MySQL password here
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employer_db database.`)
);
//connection for async-await type functions
const connection = mysql
  .createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();
//draws welcome screen ascii art credit: patorjk.com
function welcome() {
  console.log(`_____________________________________________________________________________________`)
  console.log(`                                                                                     `)
  console.log(`                                                                                     `)
  console.log(` ▄▀▀█▄▄▄▄  ▄▀▀▄ ▄▀▄  ▄▀▀▄▀▀▀▄  ▄▀▀▀▀▄    ▄▀▀▀▀▄   ▄▀▀▄ ▀▀▄  ▄▀▀█▄▄▄▄  ▄▀▀█▄▄▄▄           `)
  console.log(`▐  ▄▀   ▐ █  █ ▀  █ █   █   █ █    █    █      █ █   ▀▄ ▄▀ ▐  ▄▀   ▐ ▐  ▄▀   ▐           `)
  console.log(`  █▄▄▄▄▄  ▐  █    █ ▐  █▀▀▀▀  ▐    █    █      █ ▐     █     █▄▄▄▄▄    █▄▄▄▄▄            `)
  console.log(`  █    ▌    █    █     █          █     ▀▄    ▄▀       █     █    ▌    █    ▌            `)
  console.log(` ▄▀▄▄▄▄   ▄▀   ▄▀    ▄▀         ▄▀▄▄▄▄▄▄▀ ▀▀▀▀       ▄▀     ▄▀▄▄▄▄    ▄▀▄▄▄▄             `)
  console.log(` █    ▐   █    █    █           █                    █      █    ▐    █    ▐             `)
  console.log(` ▐        ▐    ▐    ▐           ▐                    ▐      ▐         ▐                  `)
  console.log(`                         ▄▀▀▀█▀▀▄  ▄▀▀▄▀▀▀▄  ▄▀▀█▄   ▄▀▄▄▄▄   ▄▀▀▄ █  ▄▀▀█▄▄▄▄  ▄▀▀▄▀▀▀▄ `)
  console.log(`                        █    █  ▐ █   █   █ ▐ ▄▀ ▀▄ █ █    ▌ █  █ ▄▀ ▐  ▄▀   ▐ █   █   █ `)
  console.log(`                        ▐   █     ▐  █▀▀█▀    █▄▄▄█ ▐ █      ▐  █▀▄    █▄▄▄▄▄  ▐  █▀▀█▀  `)
  console.log(`                           █       ▄▀    █   ▄▀   █   █        █   █   █    ▌   ▄▀    █  `)
  console.log(`                         ▄▀       █     █   █   ▄▀   ▄▀▄▄▄▄▀ ▄▀   █   ▄▀▄▄▄▄   █     █   `)
  console.log(`                        █         ▐     ▐   ▐   ▐   █     ▐  █    ▐   █    ▐   ▐     ▐   `)
  console.log(`                        ▐                           ▐        ▐        ▐                  `)
  console.log(`                                                                       Spooky Edition`)                                                                                                  
  console.log(`                                                                                     `)
  console.log(`_____________________________________________________________________________________`)
  console.log(`                                                                                     `)
  console.log(`                                                                                     `)                                                                                                   };                                                                        
//async/await choices for 'what is the new ee's role?'
const choiceRoles = async () => {
  const roleQuery = `SELECT id AS value, title AS name FROM role;`;
  const roles = await connection.query(roleQuery);
  return roles[0];
};
//async/await choices for 'what dept does role belong to'
const choiceDepartments = async () => {
  const choiceDepartmentsQuery = `SELECT id AS value, name AS name FROM department;`;
  const dpts = await connection.query(choiceDepartmentsQuery);
  // mgrs[0].push({ value: null, name: 'None'});
  return dpts[0];
};
//async/await choices for 'who does the new ee report to?'
const choiceManagers = async () => {
  const mgrQuery = `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;`;
  const mgrs = await connection.query(mgrQuery);
  mgrs[0].push({ value: null, name: 'None'});
  return mgrs[0];
};
const choiceEEs = async () => {
  const eeQuery = `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;`;
  const ees = await connection.query(eeQuery);
  return ees[0];
}

function init() {
  inquirer
    //Display root options list
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
      //switch statement to route each option
      switch (response.choice) {
        case "View all departments":
          db.query(
            `
          SELECT * 
          FROM department`,
            function (err, result, fields) {
              if (err) throw err;
              console.log(`\n\r`);
              console.table(result);
              init();
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
              init();
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
              init();
            }
          );
          break;
        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                message: "\n\r What is the name of the new department?",
                name: "newDepartment",
              },
            ])
            .then((response) => {
              db.query(
                `
              INSERT INTO department(name) VALUES (?)`,
                response.newDepartment,
                function (err, result, fields) {
                  if (err) throw err;
                  console.table("Department Added");
                  init();
                }
              );
            });
          break;
        case "Add a role":
          inquirer
            .prompt([
              {
                type: "input",
                message: "\n\r What is the name of the new role?",
                name: "newRole",
              },
              {
                type: "input",
                message: "\n\r Enter a salary for the new role",
                name: "newRoleSalary",
              },
              {
                type: "list",
                message: "\n\r Enter Dept role belongs to",
                name: "newRoleDept",
                choices: async () => await choiceDepartments(),
              },
            ])
            .then((response) => {
              db.query(
                `
                  INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
                [response.newRole,response.newRoleSalary,response.newRoleDept],
                function (err, result, fields) {
                  if (err) throw err;
                  console.table("Role Added");
                  init();
                }
              );
            });
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
                type: "list",
                message: "Choose your ee's role",
                name: "roleID",
                choices: async () => await choiceRoles(),
              },
              {
                type: "list",
                message: "Choose your ee's manager",
                name: "mgrID",
                choices: async () => await choiceManagers(),
              }
            ]).then((response) => {

              db.query(
                `
                INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
                [response.eFName, response.eLName, response.roleID, response.mgrID],
                function (err, result, fields) {
                  if (err) throw err;
                  console.log(`\n\r Employee added`);
                  init();
                }
              );
          });

          break;
        case "Update an employee role":
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "\n\r Whose Role?",
                  name: "eeToUpdate",
                  choices: async () => choiceEEs(),
                },
                {
                  type: "list",
                  message: "\n\r What will the new role be?",
                  name: "roleUpdate",
                  choices: async () => choiceRoles(),
                },
              ])
              .then((response) => {
                db.query(
                  `
                UPDATE employee
                SET role_id = ?
                WHERE id = ?`,
                  [response.roleUpdate,response.eeToUpdate],
                  function (err, result, fields) {
                    if (err) throw err;
                    console.table(`\n\r Employee Role Updated`);
                    init();
                  }
                );
              });
            break;
          default:
          console.log("switch");
      }
    });
}

// Function call to initialize app
welcome();
init();
