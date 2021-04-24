const url = require('url');

myURL = new URL('http://mywebsite.com/hello.html?id=100&status=active');
console.log(myURL);
 
//OUTPUT

// URL {
//     href: 'http://mywebsite.com/hello.html?id=100&status=active',
//     origin: 'http://mywebsite.com',
//     protocol: 'http:',
//     username: '',
//     password: '',
//     host: 'mywebsite.com',
//     hostname: 'mywebsite.com',
//     port: '',
//     pathname: '/hello.html',
//     search: '?id=100&status=active',
//     searchParams: URLSearchParams { 'id' => '100', 'status' => 'active' },
//     hash: ''
//   }