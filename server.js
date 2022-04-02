const http = require('http');
const fs = require('fs');
const chalk = require('chalk')

const PORT = 3001;

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else if (req.url == '/favicon.ico') {
        fs.createReadStream('./favicon.ico').pipe(res);
    } else {
        res.destroy();
    }
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server started on port: ${PORT}`));
});
