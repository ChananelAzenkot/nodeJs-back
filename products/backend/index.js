const express = require('express');
require("./sqlConnection");

const app = express();

app.listen(4000, () => {
    console.log('Listening to port 4000');
});

app.get('/', (req, res) => {
    res.send('Hello from products');
});



require('./handlers/products')(app);