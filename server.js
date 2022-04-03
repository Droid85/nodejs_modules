const http = require('http');
const fs = require('fs');
let { info, warn, error } = require('./utils/logger');
const logFile = require('./utils/logUrlToFile')

const PORT = 3001;

const server = http.createServer();

server.on('request', (req, res) => {
    logFile.logUrl(req.url)
    if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else if (req.url == '/favicon.ico') {
        fs.createReadStream('./favicon.ico').pipe(res);
    } else {
        res.destroy();
    }
});

server.listen(PORT, () => {
    info(`Server started on port: ${PORT}`);
});
