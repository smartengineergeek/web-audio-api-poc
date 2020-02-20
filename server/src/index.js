const express = require('express');
const app = express();
// const api = express();

const http = require('http');
const path = require('path');
// const fileSystem = require('file-system');
// const bodyParser = require('body-parser');

// register api calls
let publicly = path.join(__dirname, '../public');

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3002');
    next();
});

app.get("/api/v1/audio", function(req, res){
    res.sendFile(path.join(publicly, "sound.opus"))
});


app.listen('3001', () => console.log('Server app listening on port 3001!'));