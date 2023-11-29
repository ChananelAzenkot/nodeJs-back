const con = require("../sqlConnection");

module.exports = (app) => {
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (req.session.attempts >= 5) {
      return res.status(403).send({ message: "user is blocked !! " });
    }

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
          if (!req.session.attempts) {
            req.session.attempts = 0;
          }
          req.session.attempts++;

          return res
            .status(403)
            .send({ message: "Email or password is not correct" });
        }

        delete req.session.attempts;

        if (!result.length) {
          return res.status(401).send({ message: "User not found " });
        }
        const user = result.pop();

        req.session.user = user;

        res.send(user);
      }
    );
  });

  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      res.status(401).send({ message: "User not found" });
    }
  });
};
