CREATE TABLE materials(
    id INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    material VARCHAR(100),
    name VARCHAR(100),
    description VARCHAR(100),
    family VARCHAR(100),
    feature VARCHAR(100),
    color VARCHAR(50)
)