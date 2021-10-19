// external dependencies
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
require('console.table');

// internal dependencies
const { mainMenu, empMenum, tableMenu, empMenu } = require('./menu');

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

function init() {{
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

            case mainMenu.viewByDept:
                viewEmployees('department');
                break;

            case mainMenu.viewByManager:
                viewEmployees('manager');
                break;

            case mainMenu.editDeptRole:
                editDeptRole();
                break;

            case mainMenu.updateEmployee:
                updateEmployee()
                break;

            case mainMenu.exit:
                db.end();
                console.log('Thank you for using TownPortal 2021')
                console.log('===== Goodbye =====')
                break;
        }
    })
}}

// == Functions ==

async function addEmployee() {
    const addname = await inquirer.prompt(askName());
    db.query(`SELECT role.id, role.title FROM role ORDER BY role.id;`, async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                message: 'For which position was the employee hired?',
                choices: () => res.map(res => res.title),
                message: 'For which position was the employee hired?'
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        db.query(`SELECT * FROM employee`, async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.first_name} ${res.last_name}`);
            choices.push('none');
            let { manager } = await inquirer.prompt([
                {
                    name: 'manager',
                    type: 'list',
                    choices: choices,
                    message: 'Choose the employee Manager: '
                }
            ]);
            let managerId;
            let managerName;
            if (manager === 'none') {
                managerId = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managerId = data.id;
                        managerName = data.fullName;
                        console.log(managerId);
                        console.log(managerName);
                        continue;
                    }
                }
            }
            console.log('Employee has been added. Please view all employee to verify...');
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: addname.first,
                    last_name: addname.last,
                    role_id: roleId,
                    manager_id: parseInt(managerId)
                },
                (err, res) => {
                    if (err) throw err;
                    updateEmployee();
                }
            );
        })
    })
}

function askId() {
    return ([
        {
            name: "name",
            type: "input",
            message: "What is the employe ID?:  "
        }
    ]);
}

function askName() {
    return ([
        {
            name: "first",
            type: "input",
            message: "Insert Employee First Name: "
        },
        {
            name: "last",
            type: "input",
            message: "Insert Employee Last Name:"
        }
    ]);
}

function editDeptRole() {{
    inquirer.prompt({
        type: 'list',
        name: 'dept',
        message: 'Edit departments and roles',
        choices: [
            tableMenu.addDepartment,
            tableMenu.remDepartment,
            tableMenu.addRole,
            tableMenu.remRole,
            tableMenu.return,
        ]
    })
    .then(answer => {
        console.log(answer.dept);
        switch(answer.dept) {
            case tableMenu.addDepartment:
                
                break;

            case tableMenu.remDepartment:
                remove('remDept');
                break;

            case tableMenu.addRole:
                
                break;

            case tableMenu.remRole:
                remove('remRole');
                break;

            case tableMenu.return:
                init();
                break;
        }
    })
}}

function remove(str) {
    const promptQ = {
        yes: "yes [emp id required]",
        no: "no [return to employee menu]"
    };
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Are you sure you wish to edit/delete this data? [action cannot be undone]",
            choices: [promptQ.yes, promptQ.no]
        }
    ]).then(answer => {
        if (str === 'remEmp' && answer.action === "yes [delete]") removeEmployee();
        else if (str === 'remDept' && answer.action === "yes [delete]") removeDepartment();
        else if (str === 'remRole' && answer.action === "yes [delete]") removeRole();
        else updateEmployee();
    });
};

async function removeDepartment() {
    const sql = `SELECT id AS id, name AS department 
    FROM department
    ORDER BY id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(``);
        console.log(`==========================`);
        console.log('=== Departments ==');
        console.log(`==========================`);
        console.table(res);
        console.log(``);
        init();
    })

    const answer = await inquirer.prompt([
        {
            name: "dept",
            type: "input",
            message: "Enter the ID for the department you want to remove:  "
        }
    ]);

    db.query('DELETE FROM department WHERE ?',
        {
            id: answer.dept
        },
        function (err) {
            if (err) throw err;
        }
    )
    console.log(``);
    console.log('Department has been successfully deleted. Returning to main menu...');
    console.log(``);
    console.log(``);
    init();
};

async function removeEmployee() {
    const answer = await inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Enter the employee ID you want to remove:  "
        }
    ]);

    db.query('DELETE FROM employee WHERE ?',
        {
            id: answer.first
        },
        function (err) {
            if (err) throw err;
        }
    )
    console.log(``);
    console.log('Employee has been successfully deleted. Returning to main menu...');
    console.log(``);
    console.log(``);
    updateEmployee();
};

function updateEmployee() {{
    inquirer.prompt({
        type: 'list',
        name: 'emp',
        message: 'Edit employee information',
        choices: [
            empMenu.addEmployee,
            empMenu.remEmployee,
            empMenu.updManager,
            empMenu.updRole,
            empMenu.return,
        ]
    })
    .then(answer => {
        console.log(answer.emp);
        switch(answer.emp) {
            case empMenu.addEmployee:
                addEmployee();
                break;

            case empMenu.remEmployee:
                remove('remEmp');
                break;

            case empMenu.updManager:
                updateMng()
                break;

            case empMenu.updRole:
                updateRole();
                break;

            case empMenu.return:
                init();
                break;
        }
    })
}}

async function updateMng() {
    const employeeId = await inquirer.prompt(askId());
    db.query(`SELECT * FROM employee`, async (err, res) => {
        if (err) throw err;
        let choices = res.map(res => `${res.first_name} ${res.last_name}`);
        choices.push('none');
        let { manager } = await inquirer.prompt([
            {
                name: 'manager',
                type: 'list',
                choices: choices,
                message: 'Choose the employee Manager: '
            }
        ]);
        let managerId;
        let managerName;
        if (manager === 'none') {
            managerId = null;
        } else {
            for (const data of res) {
                data.fullName = `${data.first_name} ${data.last_name}`;
                if (data.fullName === manager) {
                    managerId = data.id;
                    managerName = data.fullName;
                    console.log(managerId);
                    console.log(managerName);
                    continue;
                }
            }
        }
        db.query(`UPDATE employee 
        SET manager_id = ${managerId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log(``);
            console.log('Manager has been updated. Returning to employee menu...')
            console.log(``);
            console.log(``);
            updateEmployee();
        });
    });
}

async function updateRole() {
    const employeeId = await inquirer.prompt(askId());
    db.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the new employee role?: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        db.query(`UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log(``);
            console.log('Role has been updated. Returning to main menu...')
            console.log(``);
            console.log(``);
            init();
        });
    });
}

function viewAllDepartments() {
    const sql = `SELECT id AS id, name AS department 
    FROM department
    ORDER BY id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(``);
        console.log(`==========================`);
        console.log('=== View all deparments ==');
        console.log(`==========================`);
        console.table(res);
        console.log(``);
        init();
    })
}

function viewEmployees(order) {
    if(order==='name') {
        var sort = 'employee.last_name';
    } else if (order==='department') {
        var sort = 'department.name';
    } else {
        var sort = 'manager.last_name';
    }
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id=employee.manager_id
    INNER JOIN role ON employee.role_id=role.id
    INNER JOIN department ON role.department_id=department.id
    ORDER BY ${sort}`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(``);
        console.log(`==========================`);
        console.log(`=== View all employees by ${order} ==`);
        console.log(`==========================`);
        console.table(res);
        console.log(``);
        init();
    })
}

function viewAllRoles() {
    const sql = `SELECT role.id, title, department.name AS deparment, salary, IF(tips, 'yes', 'no') tips
    FROM role
    INNER JOIN department
    ON role.department_id=department.id
    ORDER BY role.id, department.name;`
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(``);
        console.log(`==========================`);
        console.log('=== View all roles ==');
        console.log(`==========================`);
        console.table(res);
        console.log(``);
        init();
    })
}

module.exports = { init };