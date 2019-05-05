'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _mkdirp = require('mkdirp');

var _stringify = require('./stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var messages = _ref.messages,
      directory = _ref.directory,
      _ref$fileName = _ref.fileName,
      fileName = _ref$fileName === undefined ? 'defaultMessages.json' : _ref$fileName,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === undefined ? true : _ref$sortKeys,
      _ref$jsonSpaceIndenta = _ref.jsonSpaceIndentation,
      jsonSpaceIndentation = _ref$jsonSpaceIndenta === undefined ? 2 : _ref$jsonSpaceIndenta;

  if (!messages) {
    throw new Error('Messages are required');
  }

  if (!directory || typeof directory !== 'string' || directory.length === 0) {
    throw new Error('Directory is required');
  }

  var DIR = _path2.default.join(directory, fileName);

  (0, _mkdirp.sync)(directory);
  (0, _fs.writeFileSync)(DIR, (0, _stringify2.default)(messages, { space: jsonSpaceIndentation, sortKeys: sortKeys }));
};