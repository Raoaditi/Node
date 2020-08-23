const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to the server');
}, (err) => { console.log(err); });

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/dishes/:dishId', dishRouter);

app.use('/promotions', promoRouter);
app.use('/promotions/:promoId', promoRouter);

app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderId', leaderRouter);

app.use(express.static(__dirname + '/public'));

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
