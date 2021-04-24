//path: This parameter holds the path of the directory has to be created.
//mode: This parameter holds the recursive boolean value. The mode option is used to set the directory permission, by default it is 0777.
//callback: This parameter holds the callback function that contains error. The recursive option if set to true will not give an error message if the directory to be created already exists.

const fs = require('fs');
const path = require('path');

// Create folder
//fs.mkdir(path, mode, callback)
// fs.mkdir(path.join(__dirname, '/test'), err => {
//     if(err) throw err;
//     console.log('Folder was created!');
// })

// Create and write to file
//fs.writeFile( file, data, options, callback )
// fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello World!', err=> {
//     if(err) throw err;
//     console.log("File has been written.");

//     //Append file
//     fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), "This is the new text I want to append", (err) => {
//         if (err) throw err;
//         console.log("I appended a new line");
//     })
// });

//Read a file
//fs.readFile( filename, encoding, callback_function )
fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf-8', (err,data) => {
    if (err) throw err;
    console.log(data);
    console.log("File was read");
});


//Rename File - Synchronous 
//fs.renameSync( oldPath, newPath )
fs.renameSync(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'helloworld.txt'));
