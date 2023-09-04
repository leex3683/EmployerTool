const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

// Connect to database
//TODO - hide credentials
const db = mysql
  .createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: "company_db",
  })
  .promise();

  //this is where you write your query
  const dptChoices = async () => {
    const deptQuery = `SELECT id AS value, title AS name FROM role;`;
    const depts = await db.query(deptQuery);
    console.log(depts[0])
    return depts[0];
  };


inquirer.prompt([
  {
    type: "list",
    message: "Choose your dept",
    name: "id",
    choices: async () => await dptChoices(),
  }
]);



