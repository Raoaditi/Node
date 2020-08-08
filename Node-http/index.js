const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;
//Setting up the server
//http-Module
//createServer-Method
//.headers-property
//req,res- request, response messages
const server = http.createServer((req,res)=>{
    //console.log(req.headers);
    //res.statusCode = 200;
    //res.setHeader('Content-type','text/html');
    //res.end('<html><body><h1>Hello World!</h1></body></html>');
    console.log('Request for ' + req.url + ' by method ' + req.method);

    //req.method => GET/POST
    //req.url => '/' or '/Something'

    /* Getting the url of your file. */
    if (req.method == 'GET'){
        var fileUrl;
        console.log('Check Check! req.url ' +req.url);
        if(req.url == '/') {
            fileUrl = '/index.html';//HTML!!
        } 
        else{
            console.log('I want to check req.url ' +req.url);
            fileUrl = req.url;
        }
         

        var filePath = path.resolve ('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        //Ext => Extension (returns '.html', '.js' etc)
        // For path.extname ('index.js') Return: '.js' 
        // Similarly, For index.coffee.md Return: '.md'  ( returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path)
        //https://nodejs.org/api/path.html#path_path_extname_path  (Reference)

        console.log('Yeh hai Extension: ' +fileExt);
        //File extension should be html.
        if(fileExt == '.html') {
            /* Check if the Url is valid or not. If not send a 404 error msg
                If valid, Pipe the res to the filePath.
            */
           console.log('Yes! file html hai');
            fs.exists(filePath,(exists) =>{
                /* If the url or file path or file 
                    Doesnt exists, Set the response headers to an html file, 
                    Whose content is Error 404: (the file Url) not found
                */
               console.log('Checking for File: '+filePath+' to exist....')
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + 
                    ' not found</h1></body></html>');
                    console.log('File: '+filePath+'doesnot exists!');
                    return;
                }
                /* If the file Exists,
                    set content type to html,
                    and pipe the response to the given filePath so it can read the data in it!
                */
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/html');
                console.log('File: '+filePath+' exists!');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
        }

    }

    else{
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
            ' not a GET request Or not Supported</h1></body></html>');
    }

});
server.listen(port, hostname, ()=>{
    console.log(`Server running at http:// ${hostname}:${port}`);
});