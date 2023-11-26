const con = require("../sqlConnection");

module.exports = (app) => {
    app.post("/logout", (req, res) => {
        req.session.destroy();
        res.send({ message: "Logged out" });
    });
};