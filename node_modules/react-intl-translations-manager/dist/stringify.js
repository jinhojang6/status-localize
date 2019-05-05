'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonStableStringify = require('json-stable-stringify');

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

var _compareByKey = require('./compareByKey');

var _compareByKey2 = _interopRequireDefault(_compareByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (value, _ref) {
  var _ref$replacer = _ref.replacer,
      replacer = _ref$replacer === undefined ? null : _ref$replacer,
      _ref$space = _ref.space,
      space = _ref$space === undefined ? 2 : _ref$space,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === undefined ? true : _ref$sortKeys,
      _ref$trailingNewline = _ref.trailingNewline,
      trailingNewline = _ref$trailingNewline === undefined ? false : _ref$trailingNewline;
  return (sortKeys ? (0, _jsonStableStringify2.default)(value, { replacer: replacer, space: space, cmp: _compareByKey2.default }) : JSON.stringify(value, replacer, space)) + (trailingNewline ? '\n' : '');
};