const con = require("../sqlConnection");

module.exports = (app) => {
  app.post("/signup", (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .send({ message: "Some required fields are missing" });
    }
    con.query(
      "INSERT INTO `users` (`fullName`,`email`,`password`) VALUES (?, ?,MD5(?))",
      [fullName, email, password],
      (err, result) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.send({ message: "User was registered successfully!" });
      }
    );
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Some required fields are missing" });
    }
    con.query(
      "SELECT * FROM `users` WHERE `email` = ? AND `password` = MD5(?)",
      [email, password],
      (err, result) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        if (result.length === 0) {
          return res.status(401).send({ message: "Invalid credentials" });
        }
        res.send({ message: "User was logged in successfully!" });
      }
    );
  });
};
