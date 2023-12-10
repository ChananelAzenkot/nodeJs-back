const bcrypt = require("bcrypt");
const { User } = require("./userModel");

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

    res.send(userObj);
  });
};
