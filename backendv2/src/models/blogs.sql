CREATE TABLE blogs(
     id int(12) not null primary key auto_increment,
     slug varchar(255),
     body varchar(1000),
    createdAt timestamp default current_time ,
    updatedAt timestamp,
    images varchar(1000),
    title varchar(100),
    subTitle varchar(100),
    authorID int(12),
    FOREIGN KEY (authorID) REFERENCES users(id) 

)