const fs = require("fs");
let { info, warn, error } = require('./logger');

function logUrl(urlPath) {
    const writeStream = fs.createWriteStream("./urlAddress.log", { encoding: "utf-8", flags: "a+" });

    writeStream.on("error", err => {
        error("[STREAM ERROR]", err);
    })
    writeStream.on("close", () => {
        warn("closed")
    })
    writeStream.on("finish", () => {
        info("finished")
    })
    writeStream.write(`${new Date().toISOString()}\n${urlPath} \n`)
    writeStream.end()
}

module.exports = {
    logUrl
}
