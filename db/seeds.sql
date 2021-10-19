-- ==============================
-- CREATE DEPARTMENTS AND ROLES
-- ==============================

INSERT INTO department (name)
VALUES 
        ('Front of House'), -- server, hostess, busser, bartender
        ('Back of House'), -- line, cook, prep
        ('Management'), -- head chef, assistant manager, gm
        ('Executive'); -- human resources, financial officer, owner

INSERT INTO role (title, salary, tips, department_id)
VALUES  
        ('Server', 20800, true, 1),
        ('Hostess', 26000, true, 1),
        ('Busser', 16640, true, 1), 
        ('Bartender', 27040, true, 1),
        ('Line', 20800, false, 2),
        ('Cook', 26000, false, 2),
        ('Prep', 16640, true, 2),
        ('Head Chef', 33280, false, 3),
        ('Ast. Manager', 37440, false, 3),
        ('General Manager', 62400, false, 3),
        ('Human Resources', 45000, false, 4),
        ('Financial Officer', 47500, false, 4),
        ('Owner', 153000, false, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
        ('Brigitte', 'Powers', 13, null), -- Owner 1
        ('Rowan', 'Callaghan', 12, null), -- financial officer
        ('Jordan', 'Paull', 11, null), -- human resources
        ('Jamie', 'Williams', 11, null), -- human resources
        ('Victoria', "Higgins", 10, null), -- gm 5
        ('Kathryn', 'Belle', 9, 5), -- asst mngr 6 
        ('Aydan', 'Downs', 8, 5), -- head chef 7
        ('Minnie', 'Delgado', 7, 7), -- prep
        ('Julianna', 'Ombren', 6, 7), -- cook
        ('Jennalee', 'Mason', 5, 7), -- line
        ('Kyrie', 'Fletcher', 4, 7), -- bartender
        ('Lan', 'Tsukino', 3, 6), -- busser
        ('Lily', 'Akins', 2, 6), -- hostess
        ('Nicholas', 'Dominguez', 1, 6), -- server
        ('Steven', 'Irvine', 1, 6); -- server
