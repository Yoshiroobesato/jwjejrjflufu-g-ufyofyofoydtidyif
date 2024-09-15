const http = require('http');
const https = require('https');

// Configuración del servidor
const server = http.createServer((req, res) => {
    if (req.url === '/get-data' && req.method === 'GET') {
        // Hacer la solicitud GET a la API externa
        https.get('https://streamtp.live/status.json', (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching data');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Puerto en el que escuchará el servidor
server.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
