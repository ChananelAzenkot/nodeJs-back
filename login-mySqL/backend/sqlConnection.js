const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'MySqL-Chananel',
    port: 8889
});

con.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to database');
});

// exports.con = con;
module.exports = con;