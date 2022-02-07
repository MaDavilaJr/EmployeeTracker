const db = require('./db/connection');
const inquirer = require('inquirer');
const { first } = require('lodash');
require('console.table');

function dbOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employee'
            ]
        }
    ]).then(res => {
        var choice = res.choice

        switch (choice) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Employee':
                addEmployee();
                break;
        }
    })
}

function viewAllEmployees() {
    var sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`;

    db.query(sql, function(err, res) {
        if (err) throw err;

        console.table(res);
    })
    dbOptions();
};

function viewAllRoles() { 
    var sql = `SELECT * FROM role;`;

    db.query(sql, function(err, res) {
        if (err) throw err;

        console.table(res);
    })
    dbOptions();
};

function viewAllDepartments() { 
    var sql = `SELECT * FROM department;`;

    db.query(sql, function(err, res) {
        if (err) throw err;

        console.table(res);
    })
    dbOptions();
};

function addEmployee(){
    inquirer.prompt([
        {
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            name: 'lastName',
            message: "What is the employee's last name?"
        }
    ]).then(res => {
        var firstName = res.firstName;
        var lastName = res.lastName;
        var sql1 = `SELECT * FROM ROLE`;
        db.query(sql1, function(err, res) {
            if(err) throw err;
            var roleChoices = res.map(({id, title}) => ({
                name: title,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the new employee role?',
                    choices: roleChoices
                }
            ]).then(res => {
                var roleId = res.roleId;
                var sql2 = `SELECT * FROM employee WHERE manager_id IS NULL;`

                db.query(sql2, function(err, res) {
                    if(err) throw err;
                    var managerChoices = res.map(({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    managerChoices.unshift({name: 'None', value: null});

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Who will be the new employee manager?',
                            choices: managerChoices
                        }
                    ]).then(res => {
                        var employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }
                        var sql3 = `INSERT INTO employee SET ?`
                        db.query(sql3, employee, function(err, res) {
                            if (err) throw err;
                        })
                    }).then(() => {
                        console.log(`Added ${firstName} ${lastName} to the Database`)
                        dbOptions()
                    })
                })
            })
        })
    })
}

//Query all employees
//Then ask inquirer prompt which employee to update
//Query All roles and pass that into a const
//Then ask what the new employees role is
// Last query to UPDATE employee SET role_id = ? where id = ?

dbOptions();