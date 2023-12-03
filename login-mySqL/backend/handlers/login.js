const con = require('../sqlConnection');

module.exports = app => {

    app.post("/login", (req, res) => {
        const { email, password } = req.body;

        if (req.session.attemps >= 7) {
            return res.status(403).send({ message: 'not good , passwords wrong try agin !' });
        }

        if (!email || !password) {
            return res.status(403).send({ message: 'one or more then  not okay.' });
        }

        con.query("SELECT * FROM `users` WHERE `email` = ? AND `password` = MD5(?)", [email, password], (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error' });
            }

            if (!result.length) {

                if (!req.session.attemps) {
                    req.session.attemps = 0;
                }

                req.session.attemps++;

                return res.status(403).send({ message: 'Email or password is not correct' });
            }

            delete req.session.attemps;

            const user = result.pop();

            req.session.user = user;

            res.send(user);
        });
    });

    app.get('/login', (req, res) => {
        
        if (req.session.user) {
            res.send(req.session.user);
        } else {
            res.status(401).send({ message: 'user is not connected' });
        }
    });

}