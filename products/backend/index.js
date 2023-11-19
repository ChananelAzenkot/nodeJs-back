const express = require('express');
require("./sqlConnection");

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: true,
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Accept",
  })
);

app.listen(4000, () => {
    console.log('Listening to port 4000');
});

app.get('/', (req, res) => {
    res.send('Hello from products');
});

require('./handlers/products')(app);