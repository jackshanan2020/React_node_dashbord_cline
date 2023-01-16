
CREATE TABLE categories(
     id int(12) not null primary key auto_increment,
     categoryName varchar(50)
)


CREATE TABLE product(
    id int(12) not null primary key auto_increment,
    name varchar(255) not null,
    title varchar(255) not null,
    shortDescription varchar(255) not null,
    sku varchar(50),
    longDescription varchar(255) not null,
    price int(12) not null,
    variations varchar(255) not null,
    variationID int(12) not null,
    slug varchar(255) not null,
    badge varchar(100) not null,
    rating int(11),
    quantity int(11) not null,
    gallery varchar(255),
    storeID int(12) not null,
    categoryID int(255) not null,
    FOREIGN KEY (storeID) REFERENCES store(id),
    FOREIGN KEY (variationID) REFERENCES productVariations(id),
     FOREIGN KEY (categoryID) REFERENCES categories(id)
)

CREATE TABLE store(
    id int(12) not null primary key auto_increment,
    storeName varchar(255) not null
)
CREATE TABLE orders(
    id int(12) not null primary key auto_increment,
    orderUserID int(12),
    orderAmount FLOAT,
    orderShipName varchar(100),
    orderShipAddress varchar(100),
    orderShipAddress2 varchar(100),
    orderCity varchar(50),
    orderState varchar(50),
    orderCountry varchar(50),
    orderZip varchar(20),
    orderPhone varchar(20),
    orderDate timestamp,
    orderShipped TINYINT(1),
    orderTrackingNumber varchar(80),
     FOREIGN KEY (orderUserID) REFERENCES users(id)

)

CREATE TABLE orderdetails(
     id int(12) not null primary key auto_increment,
    orderID int(12),
    productID int(12),
    orderName varchar(255),
    orderPrice FLOAT,
    sku varchar(50),
    orderQuantity int(12),
    FOREIGN KEY (orderID) REFERENCES orders(id),
    FOREIGN KEY (productID) REFERENCES product(id)
)
