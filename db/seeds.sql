
-- seed values for department table:
INSERT INTO department (name)
VALUES ("Development"), 
       ("Marketing"),
       ("Human Resources"),
       ("Accounting");

-- seed values for role table:
INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 90000, 1),
       ("UI Design", 85000, 1),
       ("Marketing Analyst", 65000, 2), 
       ("Marketing Manager", 70000, 2), 
       ("HR Director", 120000, 3), 
       ("HR Assistant", 65000, 3),
       ("Tax Accountant", 85000, 4),
       ("Accounting Mananger", 90000, 4);

-- seed values for employee table:
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sebastian", "Tischner", 1, null),
       ("Alex", "Sauce", 2, 1),
       ("Alan", "Mumulski", 3, null),
       ("Tanner", "Smith", 4, 3),
       ("Domagoj", "Vukovic", 5, null),
       ("Canyon", "Bond", 6, 5),
       ("Louis", "Matthews", 7, null),
       ("Cody", "Daily", 8, 7);



