const mysql = require("mysql");

//Create connection


  const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "springpaldb.sql",
    multipleStatements: true,
  });

//Connection db

module.exports = connection;
