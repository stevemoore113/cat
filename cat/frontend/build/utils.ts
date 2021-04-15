const path = require('path');

exports.resolve = (...arg: any) => path.join(__dirname, '..', ...arg);