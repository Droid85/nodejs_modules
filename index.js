const fs = require('fs');
const path = require('path');

let { info, warn, error } = require('./utils/logger');
let { seek } = require('./utils/FileSeeker');

info('New message');
warn('Warning');
error('Error!!!');
seek();