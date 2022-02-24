// call the 'http' library from Node
const http = require('http'); 
const fs = require('fs');
const { parse } = require('path/posix');

// If requested, use this function
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }    
    // Display page info in terminal
    // console.log(req.url, req.method, req.headers);
    // process.exit();
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();   //<Buffer 6d 65 73 73 61 67 65 3d 79 6f 75 68 6f 6f> 
            // console.log(parsedBody);                             //message=[textFromForm]
            const message = parsedBody.split('=')[1];               // SPlit on "=", take element on right of "="
            fs.writeFileSync('message.txt', message);               // Save message in new file called "message.txt" 
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end(); 
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server</h1></body>');
    res.write('</html>');
    // tell Node that we're done writing NO MORE res.write after this!
    res.end();
});

// Browser localhost: 3000 for run after running in IDE
server.listen(4000);