'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.subheader = exports.header = exports.newLine = undefined;

var _chalk = require('chalk');

var newLine = exports.newLine = function newLine() {
  return console.log(' ');
};

var header = exports.header = function header(title) {
  console.log(_chalk.bold.underline(title));
  newLine();
};

var subheader = exports.subheader = function subheader(title) {
  return console.log(title);
};

var footer = exports.footer = function footer() {
  newLine();
};