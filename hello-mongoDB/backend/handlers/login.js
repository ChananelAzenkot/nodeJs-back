const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./userModel");
const JWT_SECRET = 'mongoDBChananel!!!Azenkot';

module.exports = (app) => {
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).send("Missing fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).send("password or email incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).send("password or email incorrect");
    }
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.email;

    userObj.token = jwt.sign({ user: userObj }, JWT_SECRET,{expiresIn: '1h'});

    res.send(userObj);
  });

  app.get("/login", async (req, res) => {
    const { token } = req.headers;

    if (!token) {
      return res.status(403).send("Missing token");
    }

    try {
      const { user } = jwt.verify(token, JWT_SECRET);
      res.send(user);
    } catch (e) {
      res.status(403).send("Invalid token");
    }
  });
};
