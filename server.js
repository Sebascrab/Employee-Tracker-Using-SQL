


// importing and requiring packages:

const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');


// connecting to mysql database:
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '3577',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// prompts user to answer inital questions
const questions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'view',
            message: 'Welcome to your team! Please make a selection from the following options:',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add Department',
                'Add role',
                'Add Employee',
                'Update an employee role',
                'Done']
        }
    ])

        // switch that calls functions depending on selection 
        .then((answers) => {
            switch (answers.view) {
                case 'View all departments':
                    viewDepartments();
                    break
                case 'View all roles':
                    viewRoles();
                    break
                case 'View all employees':
                    viewEmployees();
                    break
                case 'Add Department':
                    addDepartment();
                    break
                case 'Add role':
                    addRole();
                    break
                case 'Add Employee':
                    addEmployee();
                    break
                case 'Update an employee role':
                    updateEmployeeRole();
                    break
                case 'Done':
                    process.exit
                    break
            }
        })
};





// functions:




// function to show departments:
viewDepartments = async () => {
    const data = await db.promise().query('select * from department')
    console.table(data[0])
    questions()
}

// function to view all roles:
viewRoles = async () => {
    const data = await db.promise().query('select title, salary, department.name from role left join department on role.department_id=department.id')
    console.table(data[0])
    questions()

}

// function to view all employees:
viewEmployees = async () => {
    const data = await db.promise().query('select employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name as manager from employee left join role on role.id=employee.role_id left join department on department.id=role.department_id left join employee manager on employee.manager_id=manager.id')

    console.table(data[0])
    questions()

}

// function to add department:
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?',
        }
    ])
        .then(async answer => { 
            const data = await db.promise().query('INSERT INTO department set ?', answer)

            console.log('You have added ' + answer.addDepartment + ' to the list of Departments');
            questions()
        })
};

// function to add role: 
addRole = async() => {
    const departments = await db.promise().query('select id as value, name as name from department')
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role you would like to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'How much is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What is the name of the deparment this role will be in?',
            choices: departments[0]
        }
    ])
        .then(async answer => {
            const data = await db.promise().query('INSERT INTO role set ?', answer)

            console.log('You have added ' + answer.addRole + ' to the list of Roles');
            questions()
        })
};

// function to add employee: 
addEmployee = async() => {
    const roles = await db.promise().query('select id as value, title as name from role')
    const employee = await db.promise().query('select id as value, first_name as name from employee')
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the role for the employee you are adding?',
            choices: roles[0]
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager of the new employee?',
            choices: employee[0]
        }
    ])
        .then(async answer => {
            const data = await db.promise().query('INSERT INTO employee set ?', answer)

            console.log('You have added ' + answer.firstName + answer.lastName + ' to the list of new employees');
            questions()
        })
};

// function to update an employee

updateEmployeeRole = async() => {
    const employee = await db.promise().query('select id as value, first_name as name from employee');
    const roles = await db.promise().query('select id as value, title as name from role');

    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee would you like to update?',
            choices: employee[0]
        },
        {
            type: 'list', 
            name: 'role_id',
            message: 'What is the role you would like to update?',
            choices: roles[0]
        }


    ])

        .then(async answer => {
            const data = await db.promise().query('UPDATE employee set role_id = ? where id = ?',[answer.role_id, answer.id])
            questions()
        });

};

questions()








