const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');
const { log } = require('console');

const app = express();

app.use(cors({
    origin : true,
    credentials : true,
    methods:'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders:'Content-Type, Accept',
}));

app.listen(9600);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/file-upload', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
          res.status(503).send("Error while uploading file");
        }

        const file = files.myFile[0];

        fs.rename(file.filepath, `./files/${file.originalFilename}`, err => {

            if(err){
                res.status(503).send("Error while uploading file");
            }
                    res.send(`File ${file.originalFilename} uploaded success!`);
        });
    });
});