const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Default to index.html
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension
    const extname = path.extname(filePath);
    
    // Set content type based on file extension
    let contentType = 'text/html';
    if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.js') {
        contentType = 'text/javascript';
    } else if (extname === '.jpg' || extname === '.jpeg') {
        contentType = 'image/jpeg';
    } else if (extname === '.png') {
        contentType = 'image/png';
    }
    
    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found: ' + filePath);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});