const express = require("express");
const mysql = require("mysql2");

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "MySqL-Chananel",
  port: 8889,
});

con.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("Connected to database");
});

app.listen(2000, () => {
  console.log("Server started on port 2000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//get all users
app.get("/users", (req, res) => {
  con.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send("we have a problem");
    }
    res.send(result);
  });
});

// /users/limit?start=100&quantity=200 = get 200 users from 100
app.get("/users/limit", (req, res) => {
  if (!req.query.start) {
    return res.status(403).send("limit start is missing");
  }
  if (!req.query.quantity) {
    return res.status(403).send("limit quantity is missing");
  }
  con.query(
    "SELECT * FROM `users` LIMIT ? , ?",
    [+req.query.start, +req.query.quantity],
    (err, result) => {
      if (err) {
        return res.status(500).send("we have a problem");
      }
      res.send(result);
    }
  );
});


//get user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM `users` WHERE `id` =?", [id], (err, result) => {
    if (err) {
      return res.status(502).send("no card signal");
    }
    res.send(result.pop());
  });
});

//get all cars
app.get("/carsModel", (req, res) => {
  con.query("SELECT * FROM carsModel", (err, result) => {
    if (err) {
      return res.status(500).send("we have a problem");
    }
    res.send(result);
  });
});

//get car by id
app.get("/carsModel/:id", (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM `carsModel` WHERE `id` =? ", [id], (err, result) => {
    if (err) {
      return res.status(502).send("no card signal");
    }
    res.send(result.pop());
  });
});

