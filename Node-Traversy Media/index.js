const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
    //Build File Path
    let filePath = path.join(__dirname, "/public", req.url === "/"? "index.html" : req.url);
    
    //Get extension of the file (optional)
    const extname = path.extname(filePath);
    
    //Initial contentType
    let contentType = 'text/html';

    // Check ext and set content type (optional)
    switch (extname) {
        case ".js":
        contentType = "text/javascript";
        break;
        case ".css":
        contentType = "text/css";
        break;
        case ".json":
        contentType = "application/json";
        break;
        case ".png":
        contentType = "image/png";
        break;
        case ".jpg":
        contentType = "image/jpg";
        break;
    }

    // Check if contentType is text/html but no .html file extension (Good Practice)
    if (contentType == "text/html" && extname == "") filePath += ".html";
    

    //Logging the filePath
    //console.log(filePath);

    // //Read File
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === "ENOENT") {
                //Page not found
                fs.readFile(
                    path.join(__dirname, "public", "error.html"),
                    (err, content) => {
                        res.writeHead(404, {'Content-Type' : 'text/html'});
                        res.end(content, 'utf8');
                    }
                )
            }
            else {
                //Some Server Error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        }

        else {
            //Success!
            res.writeHead(200, {'content-type' : 'text/html'});
            res.end(content, "utf8");
        }
    })
    

})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT} ..`));


