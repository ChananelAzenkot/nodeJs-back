const express = require("express");
const app = express();

app.listen(4000, () => {
  console.log("server is running on port 4000 and you are in hello page");
});

// callback text
app.get("/", (req, res) => {
  res.send("Hello World");
});

// callback json
app.get("/home", (req, res) => {
  res.send({
    message: "Welcome to my home page",
    name: "Chananel",
    age: 25,
  });
});

// callback html
app.get("/html", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello world!</h1>");
  res.end();
});

// callback file
app.get("/file", (req, res) => {
  res.sendFile(`${__dirname}/package.json`);
});
