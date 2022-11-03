


// importing and requiring packages:

const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquier = require('inquirer');
const res = require('express/lib/response');


// server on port 3001 or heroku:
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware and parsing data into JSON:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    inquier.prompt([
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
                    db.end()
                    break
            }
        })
};





// functions:




// function to show departments:
viewDepartments = () => {
    console.log('All Departments. \n');

    
}

// function to view all roles:
viewRoles = () => {
    console.log('All Roles. \n');


}

// function to view all employees:
viewEmployees = () => {
    console.log('All Employees. \n');


}

// function to add department:
addDepartment = () => {
    inquier.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the department you would like to add?',
        }
    ])
    .then(answer => {


        console.log('You have added ' + answer.addDepartment + ' to the list of Departments');
    })
};

// function to add role: 
addRole = () => {
    inquier.prompt([
        {
            type: 'input', 
            name: 'addRole', 
            message: 'What is the name of the role you would like to add?',
        },
        {
            type: 'input', 
            name: 'addSalary', 
            message: 'How much is the salary for this role?'
        },
        {
            type: 'input', 
            name: 'addDep', 
            message: 'What is the name of the deparment this role will be in?',
        }
    ])
    .then(answer => {


        console.log('You have added ' + answer.addRole + ' to the list of Roles');
    })
};

// function to add Employee
 











// Default response if not found for other responses
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

