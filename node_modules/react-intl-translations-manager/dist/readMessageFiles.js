'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _glob = require('glob');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (messagesDirectory) {
  if (!messagesDirectory || typeof messagesDirectory !== 'string' || messagesDirectory.length === 0) {
    throw new Error('messagesDirectory is required');
  }

  var EXTRACTED_MESSAGES_DIR = _path2.default.join(messagesDirectory, '/');
  var EXTRACTED_MESSAGES = _path2.default.join(EXTRACTED_MESSAGES_DIR, '**/*.json');

  return (0, _glob.sync)(EXTRACTED_MESSAGES).map(function (filename) {
    return {
      path: filename.substring(EXTRACTED_MESSAGES_DIR.length),
      descriptors: JSON.parse((0, _fs.readFileSync)(filename, 'utf8'))
    };
  }).filter(function (file) {
    return file.descriptors.length > 0;
  });
};