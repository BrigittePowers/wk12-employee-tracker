// external dependencies
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

// internal dependencies
const { mainMenu, empMenum, tableMenu } = require('./menu');

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

function init() {{
    console.log('Initialize sequence');
    inquirer.prompt({
        type: 'list',
        name: 'main',
        message: 'What do you need to do?',
        choices: [
            mainMenu.viewAllDepartments,
            mainMenu.viewAllRoles,
            mainMenu.viewByName,
            mainMenu.viewByDept,
            mainMenu.viewByManager,
            mainMenu.editDeptRole,
            mainMenu.updateEmployee,
            mainMenu.exit
        ]
    })
    .then(answer => {
        console.log(answer.main);
        switch(answer.main) {
            case mainMenu.viewAllDepartments:
                viewAllDepartments();
                break;

            case mainMenu.viewAllRoles:
                viewAllRoles();
                break;

            case mainMenu.viewByName:
                viewEmployees('name');
                break;
        }
    })

}}

function viewAllDepartments() {
    const sql = `SELECT id AS id, name AS department 
    FROM department
    ORDER BY id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(``);
        console.log(`==========================`);
        console.log('=== View All Deparments ==');
        console.log(`==========================`);
        console.table(res);
        console.log(``);
        init();
    })
}

module.exports = { init };