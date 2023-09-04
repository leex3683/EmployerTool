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

///////////////////////////////
var deptArray = [];

db.query("select * from department", function(err, rows){
  if(err) {
    throw err;
  } else {
    setValue(rows);
  }
});

function setValue(value) {
  deptArray = value;
  console.log(deptArray);
}


//////////////////////////////

// Function call to initialize app

inquirer
                .prompt([
                  {
                    type: "list",
                    message: "\n\r What is the ee's first name?",
                    name: "eFName",
                    choices: ['1','2']                   
                  }
                ])