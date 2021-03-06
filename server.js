const app = require('./app');
const fs = require('fs');
let { info, warn, error } = require('./utils/logger');
const logFile = require('./utils/logUrlToFile')

const PORT = process.env.PORT || 3001;

app.on('request', (req, res) => {
    logFile.logUrl(req.url)
    if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else if (req.url == '/favicon.ico') {
        fs.createReadStream('./favicon.ico').pipe(res);
    } else {
        res.destroy();
    }
});

app.listen(PORT, () => {
    console.log(`Server has been started on http://localhost:${PORT}...`);
});
