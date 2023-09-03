/* dept names and ids */
/* executes on "view all departments" */
SELECT * FROM department;

/* roles with department names */
/* executes on "view all roles" */
SELECT A.id, A.title, B.name, A.salary
FROM role A
JOIN department B ON A.department_id=B.id;

/* employees data */
/* executes on "view all employees" */
SELECT A.id, A.first_name, A.last_name, C.title, C.salary, D.name as department, CONCAT(B.first_name, " ", B.last_name) AS manager_name
FROM employee A
LEFT JOIN employee B ON A.manager_id= B.id
LEFT JOIN role C on C.id = A.role_id
LEFT JOIN department D ON D.id = C.department_id;