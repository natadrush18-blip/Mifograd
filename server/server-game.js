const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🎮 Запуск сервера МифоГрад...');

const server = http.createServer((req, res) => {
    console.log('📥 Запрос:', req.url);
    
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404');
        } else {
            let contentType = 'text/html';
            if (filePath.endsWith('.js')) contentType = 'text/javascript';
            if (filePath.endsWith('.css')) contentType = 'text/css';
            if (filePath.endsWith('.json')) contentType = 'application/json';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// ИЗМЕНИ ПОРТ НА 3001!
const PORT = 3001;
server.listen(PORT, () => {
    console.log('✅ Сервер игры запущен: http://localhost:' + PORT);
    console.log('📁 Папка:', __dirname);
    console.log('📱 Для iPhone: lt --port ' + PORT + ' --subdomain mythograd');
});