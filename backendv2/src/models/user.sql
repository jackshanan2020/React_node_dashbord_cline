CREATE TABLE users(
    id int(12) not null primary key auto_increment,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    contact varchar(100),
    address varchar(255),
    role varchar(100) not null,
    varificationStatus varchar(100)

)