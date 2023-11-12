const express = require("express");
const mysql = require("mysql2");

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "MySqL-Chananel",
  port:8889
});

con.connect((err)=>{
    if(err) {
        throw err;
    }

    console.log("Connected to database");
});

app.listen(2000,()=>{
    console.log("Server started on port 2000");
});