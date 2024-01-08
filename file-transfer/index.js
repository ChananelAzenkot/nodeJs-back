const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');
const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
}));

app.listen(9600, function () {
  console.log("App listening on port 9600!");
});

app.use(express.static("public"));

app.get('/file', (req, res) => {
    res.send('Hello World!');
});

app.post("/file-upload", (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(503).send("error to upload file");
        }

        const file = files.myFile[0];

        fs.copyFile(file.filepath,`./files/${file.originalFilename}`, err => {
            if (err) {
                return res.status(503).send("Shgia basharat");
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`<meta charset="UTF-8">`);
            res.write("<h1>the picture upload</h1>");
            res.write(`<img width="100%" src="/file/${file.originalFilename}">`);
            res.end();
        });
    });
});

app.get("/file/:fileName", (req, res) => {
    res.sendFile(`${__dirname}/files/${req.params.fileName}`);
});

app.get("/files", (req, res) => {
    fs.readdir(`${__dirname}/files`, (err, files) => {
        if (err) {
            return res.status(503).send("Shgia basharat");
        }

        res.send(files);
    });
});

app.get("*", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<meta charset="UTF-8">`);
    res.write("<h1>שגיאה 404</h1>");
    res.end();
});