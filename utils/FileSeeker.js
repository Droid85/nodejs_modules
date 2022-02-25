const fs = require('fs');
const path = require('path');

function seek() {
    fs.readdir(`./utils/logger.js`, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}

module.exports = {
    seek
}
