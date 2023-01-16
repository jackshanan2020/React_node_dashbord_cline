create TABLE cart (
    id int(20) not null primary key auto_increment,
    cartId int(12) not null,
    userId int(12) not null,
    createdAt DATETIME,
    updatedAt TIMESTAMP,
    status smallint not null default 0,
    FOREIGN KEY (userId) REFERENCES users(id)
   ON DELETE NO ACTION
   ON UPDATE NO ACTION
)


create TABLE cart_item (
    id int(12) not null primary key auto_increment,
    productId int(12) not null,
    cartId int(12) not null,
    price FLOAT,
    discount FLOAT,
    quantity int(12),
    `active` TINYINT(1) not null DEFAULT 0,
    createdAt DATETIME,
    updatedAt TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES product(id),
    FOREIGN KEY (cartId) REFERENCES cart(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)