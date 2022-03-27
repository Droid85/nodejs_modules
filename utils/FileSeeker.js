const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const EventEmitter = require('events')
let { info, warn, error } = require('./logger');

function seeker(dir, file) {
    const _emitter = new EventEmitter();

    const access = promisify(fs.access);
    const readdir = promisify(fs.readdir);
    const readfile = promisify(fs.readFile);

    access(dir)
        .then(() => readdir(dir))
        .then(files => {
            if (files.includes(file)) {
                _emitter.emit("success", path.join(dir, file))
                return readfile(path.join(dir, file), "utf-8")
            }
            throw new Error(error("File doesn't exist"))
        })
        .then(content => {
            _emitter.emit("data", content)
        })
        .catch(err => {
            _emitter.emit("error", err)
        })
    return _emitter;
}

module.exports = {
    seeker
}
