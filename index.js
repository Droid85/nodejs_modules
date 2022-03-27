const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const FileSeeker = require("./utils/FileSeeker");

const args = yargs(process.argv).argv;

let { info, warn, error } = require('./utils/logger');

info('New message');
warn('Warning');
error('Error!!!');

if (!args.dir || !args.file) {
    warn('--dir and --file arguments are required!')
    process.exit(1)
}

FileSeeker.seeker(args.dir, args.file)
    .addListener("error", err => {
        console.error("ERROR", err.toString())
    })
    .addListener("success", file => {
        info("File found ", file)
    })
    .addListener("data", content => {
        info("Content", content)
    })
