const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("./sqlConnection");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "my-secret",
    name: "mySession",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: true,
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Accept",
  })
);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

app.use((req, res, next) => {
  if (!req.session.visit) {
    req.session.visit = 0;
  }
  req.session.visit++;
  console.log(req.session.visit);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Login !");
});

require("./handlers/signup")(app);
require("./handlers/login")(app);
