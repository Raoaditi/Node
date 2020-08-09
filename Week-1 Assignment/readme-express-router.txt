Exercise (Instructions): Express Router

Objectives and Outcomes
In this exercise, you will develop a web server that exports a REST API. You will use the Express framework, and the Express router to implement the server. At the end of this exercise, you will be able to:

Use application routes in the Express framework to support REST API
Use the Express Router in Express framework to support REST API


Setting up a REST API
You will continue in the node-express folder and modify the server in this exercise.
Install body-parser by typing the following at the command prompt:
    npm install body-parser@1.18.3 --save

Update index.js as shown below:
. . .

const bodyParser = require('body-parser');

. . .

app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
 
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

. . .


Start the server and interact with it from the browser/postman.











Using Express Router

Create a new folder named routes in the node-express folder.
Create a new file named dishRouter.js in the routes folder and add the following code to it:

const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

module.exports = dishRouter;




Update index.js as follows:
. . .


const dishRouter = require('./routes/dishRouter');

app.use('/dishes', dishRouter);

. . .



Conclusions

In this exercise, you used the Express framework and Express router to build a server supporting a REST API.







//Checking on Postman

FOR /dishes!!
1)GET Request 
GET -> localhost:3000/dishes -> Send
Body: Will send all the dishes to you!

2)POST Request
POST -> localhost:3000/dishes -> 
    body -> Raw -> (Dropdown)json
    Type: {
        "name": "test",
        "description": "test description"
    }
    -> Hit Send!
Body: Will add the dish: test with details: test description


3) PUT Request
PUT -> localhost:3000/dishes -> Send
Body:   PUT operation not supported on /dishes
Notice: Status Code = 403

4) DELETE Request
DELETE -> localhost:3000/dishes -> Send
Deleting all dishes



FOR /dihes/23 where 23 is dishId
Link: localhost:3000/dishes

1)GET
(23 here is a parameter which is being extracted and displayed below)
Will send details of the dish: 23 to you!

2)POST
POST operation not supported on /dishes/23
Status = 403

3)PUT
Needs the body thingies:
{
    "name": "test",
    "description": "test description"
} 
Updating the dish: 23
Will update the dish: test with details: test description

4)DELETE
Deleting dish: 23




HINT:
USE the same dishRouter.js file to also implement /dishes/:dishId endpoint



dishRouter.js Code
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
//.route-Method
//Declare endpoint to one single location
//Copy /dishes code and from app.all(...) remove app and chain that into dishRouter.route..
//You no longer now need the endpoint /dishes so delete that too
//Chain remaining methods too

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next) =>{
    res.end('Will send all the dishes to you!');
})

.post((req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((req, res, next) => {
    res.end('Deleting all dishes');
});


//EXPORT to index.js
module.exports = dishRouter;



//Promotions!!

const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next) =>{
    res.end('Will send all the promotions to you!');
})

.post((req,res,next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((req, res, next) => {
    res.end('Deleting all promotions!');
});


promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
  
.put((req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});


module.exports = promoRouter;