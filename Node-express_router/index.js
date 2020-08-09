//A Simple Server Using Express
//Serving Static Files

const express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser')

const morgan = require('morgan'); //This is morgan code Serving Static Files

const hostname = 'localhost';
const port = 3000;

//The express() function is a top-level function exported by the express module.
const app = express();
app.use(morgan('dev')); //This is morgan code Serving Static Files 
app.use(bodyParser.json());

//Building up the REST API support for /dishes-Endpoint
//Using the app.all, app.get,put,post, delete methods that are supported by express
//app.all(Endpoint, Callback function-req,res,next,)
app.all('/dishes',(req,res,next) => {
    //Handling incoming request
    //For any GET, PUT, POST, DEL.. This code will be executed
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    //Next-Continue to look for additional specifications to match for /dishes endpoint.
    next();
});




/******************* FOR /dishes *******************/
//When you get a get request this will be executed right after the above app.all thingies. The next() will cause it to pass on.
app.get('/dishes',(req,res,next) =>{
    //This function returns JSON data back to client
    res.end('Will send all the dishes to you!');
});

//Handling POST (REQUEST)
app.post('/dishes', (req,res,next) => {
    //body-Is a js object
    //.name- is a property 
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});
//Handling PUT
app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});
//Handling DELETE (REQUEST)
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});





/********************* FOR: /dishes/:dishId *********************/

app.get('/dishes/:dishId', (req,res,next) => {
    //Which dish? This info(parameter value) can be retrieved by req.params.dishId 
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});
  
app.put('/dishes/:dishId', (req, res, next) => {
    //res.write is used to add a line to the reply msg..
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});





app.use(express.static(__dirname + '/public')); //This is morgan code Serving Static Files

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