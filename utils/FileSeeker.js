const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises')
const { promisify } = require('util');
const EventEmitter = require('events')
let { info, warn, error } = require('./logger');

const notifications = new EventEmitter()

let _verbose = false

function setVerbose(value) {
    _verbose = value;
    info(`Verbose mode:  ${value}`)
}

function logsToFile(event, ...payload) {
    fs.writeFile("./events.log", `${new Date().toISOString()} ${event} ${payload} \n`, { flag: "a+" }, err => {
        error(err)
    })
}

async function seeker(dir, file) {
    try {
    await fsPromises.access(dir)
    const files = await fsPromises.readdir(dir)
    let content
            if (files.includes(file)) {
                notifications.emit("success", path.join(dir, file))
                _verbose && logsToFile("success", path.join(dir, file))
                content = await fsPromises.readFile(path.join(dir, file), "utf-8")
                notifications.emit("data", content)
                _verbose && logsToFile("data", content)
            } else {
                notifications.emit("error", new Error("File doesn't exist"))
                _verbose && logsToFile("error", new Error("File doesn't exist"))
            }
    } catch(err) {
            notifications.emit("error", err)
            _verbose && logsToFile("error", err)
        }
}

module.exports = {
    seeker,
    notifications,
    setVerbose
}

