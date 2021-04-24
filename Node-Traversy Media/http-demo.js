//THE MOST BASIC SERVER

const http = require('http');

//Create Server
http.createServer((req, res) => {
    res.write("Hello world!");
    res.end();
}).listen(3000, console.log('Server is running on port 3000... '));

