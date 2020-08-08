//A Simple Server Using Express
//Serving Static Files

const express = require('express'),
    http = require('http');
//const morgan = require('morgan'); //This is morgan code Serving Static Files

const hostname = 'localhost';
const port = 3000;

//The express() function is a top-level function exported by the express module.
const app = express();
//app.use(morgan('dev')); //This is morgan code Serving Static Files
//app.use(express.static(__dirname + '/public')); //This is morgan code Serving Static Files

app.use((req,res, next) => {
    console.log('Fetching request headers....');
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});