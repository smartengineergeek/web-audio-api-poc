const express = require('express');
const app = express();
const api = express();

const http = require('http');
const path = require('path');
const fileSystem = require('file-system');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

api.get('/track', (req, res, err) => {
    // generate file path
    const filePath = path.resolve(__dirname, '../public/sound.opus');
    // get file size info
    const stat = fileSystem.statSync(filePath);

    // set response header info
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });
    // create read stream
    const readStream = fileSystem.createReadStream(filePath);
    // attach this stream with response stream
    readStream.pipe(res);
});

// register api calls
app.use('/api/v1/', api);

const server = http.createServer(app);
server.listen('3001', () => console.log('Server app listening on port 3001!'))