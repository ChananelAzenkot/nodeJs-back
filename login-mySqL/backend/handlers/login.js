const con = require("../sqlConnection");

module.exports = (app) => {
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Some not good " });
    }
    con.query(
      "SELECT * FROM `users` WHERE `email` = ? AND `password` = MD5(?)",
      [email, password],
      (err, result) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        if (!result.length) {
          return res.status(401).send({ message: "User not found " });
        }
        res.send(result.pop());
      }
    );
  });
};
