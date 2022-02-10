use employeeTracker_db;

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Accounting'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Engineering Manager', 100000, 1),
    ('Software Engineer', 90000, 1),
    ('HR Manager', 90000, 2),
    ('Office Assistant', 60000, 2),
    ('Accounting Manager', 75000, 3),
    ('Accountant', 55000, 3),
    ('Legal Manager', 80000, 4),
    ('Lawyer', 70000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, NULL),
    ('Daniel', 'Martinez', 2, 1),
    ('Ashley', 'Cortez', 3, NULL),
    ('Kevin', 'Ducane', 4, 3),
    ('Maria', 'Perez', 5, NULL),
    ('Joseph', 'Samson', 6, 5),
    ('Tom', 'Prem', 7, NULL),
    ('Sarah', 'Allen', 8, 7);