


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














// Default response if not found for other responses
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

