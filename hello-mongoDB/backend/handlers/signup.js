const mongoose = require("mongoose");

module.exports = (app) => {
    const schema = new mongoose.Schema({
      fullName: String,
      email: String,
      password: String,
    });
        const User = mongoose.model("users", schema);
    app.post("/signup", async (req, res) => {
        const { fullName, email, password } = req.body;
        if (!email || !password || !fullName) {
            return res.status(403).send("Missing fields");
        }
        
    });
};
