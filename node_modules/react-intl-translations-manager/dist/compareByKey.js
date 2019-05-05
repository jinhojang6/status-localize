"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (a, b) {
  var ka = a.key;
  var kb = b.key;

  if (ka < kb) {
    return -1;
  }
  if (ka > kb) {
    return 1;
  }
  return 0;
};