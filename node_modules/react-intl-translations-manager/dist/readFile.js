'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

exports.default = function (filename) {
  try {
    return (0, _fs.readFileSync)(filename, 'utf8');
  } catch (err) {
    return undefined;
  }
};