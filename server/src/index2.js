const express = require('express');
const app = express();
const api = express();

const http = require('http');
const path = require('path');
const fileSystem = require('file-system');
const bodyParser = require('body-parser');

app.use(function(req, res, next){
    var data = '';
    // req.setEncoding('utf-8');
    req.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    // req.on('data', function(chunk){
    //     data += chunk;
    // });

    // req.on('end', function(){
    //     req.rawBody = data;
    //     next();
    // });

});

// app.use(bodyParser.json({
//     verify: function(req, res, buf, encoding){
//         req.rawBody =  buf;
//     }
// }));

// app.use(bodyParser.urlencoded({
//     extended: false,
//     verify: function(req, res, buf, encoding){
//         req.rawBody = buf;
//     }
// }));

app.use(bodyParser.raw({type: 'application/binary'}));

// var rawParser = function(req, res, next){
//     var chunks = [];
//     req.on('data', function(chunk){
//         chunks.push(chunk);
//     });
//     req.on('end', function(){
//         req.body = Buffer.concat(chunks);
//         next();
//     });
// }

app.use(bodyParser.raw({type: '*/*'}));

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