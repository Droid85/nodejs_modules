const fs = require('fs');
const path = require('path');

let { info, warn, error } = require('./utils/logger');

info('New message');
warn('Warning');
error('Error!!!');
