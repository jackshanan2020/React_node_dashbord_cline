CREATE TABLE productVariations(
     id int(12) not null primary key auto_increment,
     createdAt timestamp,
     variationType varchar(255),
     name varchar(255),
     variations varchar(1000)
)

CREATE TABLE product_variant(
  variant_id int(12) not null primary key auto_increment,
  product_id int(12) not null,
  variant_price float,
  variant_description varchar(255),
  variant_thumbnail varchar(255),
  variant_sku varchar(50) ,
  variant_attribute_id int(12) not null,
  variant_option varchar(100),
  variant_attribute_name varchar(100),

 createdAt timestamp not null default CURRENT_TIMESTAMP,
 FOREIGN KEY (product_id) REFERENCES product(id),
  
  )