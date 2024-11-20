const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './' + (req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    // Definir o tipo de conteúdo baseado na extensão do arquivo
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.woff':
        case '.woff2':
            contentType = 'font/woff';
            break;
        case '.ttf':
            contentType = 'font/ttf';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000; // Porta que será usada
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
