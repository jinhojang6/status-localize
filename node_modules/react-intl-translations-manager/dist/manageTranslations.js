'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral([''], ['']),
    _templateObject2 = _taggedTemplateLiteral(['\n        No existing ', ' file found.\n        A new one is created.\n      '], ['\n        No existing ', ' file found.\n        A new one is created.\n      ']);

var _fs = require('fs');

var _mkdirp = require('mkdirp');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

var _printer = require('./printer');

var _readMessageFiles = require('./readMessageFiles');

var _readMessageFiles2 = _interopRequireDefault(_readMessageFiles);

var _createSingleMessagesFile = require('./createSingleMessagesFile');

var _createSingleMessagesFile2 = _interopRequireDefault(_createSingleMessagesFile);

var _printResults = require('./printResults');

var _printResults2 = _interopRequireDefault(_printResults);

var _stringify = require('./stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultJSONOptions = {
  space: 2,
  trailingNewline: false
};

exports.default = function (_ref) {
  var messagesDirectory = _ref.messagesDirectory,
      translationsDirectory = _ref.translationsDirectory,
      _ref$whitelistsDirect = _ref.whitelistsDirectory,
      whitelistsDirectory = _ref$whitelistsDirect === undefined ? translationsDirectory : _ref$whitelistsDirect,
      _ref$languages = _ref.languages,
      languages = _ref$languages === undefined ? [] : _ref$languages,
      _ref$singleMessagesFi = _ref.singleMessagesFile,
      singleMessagesFile = _ref$singleMessagesFi === undefined ? false : _ref$singleMessagesFi,
      _ref$detectDuplicateI = _ref.detectDuplicateIds,
      detectDuplicateIds = _ref$detectDuplicateI === undefined ? true : _ref$detectDuplicateI,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === undefined ? true : _ref$sortKeys,
      _ref$jsonOptions = _ref.jsonOptions,
      jsonOptions = _ref$jsonOptions === undefined ? {} : _ref$jsonOptions,
      _ref$overridePrinters = _ref.overridePrinters,
      overridePrinters = _ref$overridePrinters === undefined ? {} : _ref$overridePrinters,
      _ref$overrideCoreMeth = _ref.overrideCoreMethods,
      overrideCoreMethods = _ref$overrideCoreMeth === undefined ? {} : _ref$overrideCoreMeth;

  if (!messagesDirectory || !translationsDirectory) {
    throw new Error('messagesDirectory and translationsDirectory are required');
  }

  var defaultPrinters = {
    printDuplicateIds: function printDuplicateIds(duplicateIds) {
      (0, _printer.header)('Duplicate ids:');
      if (duplicateIds.length) {
        duplicateIds.forEach(function (id) {
          console.log('  ', 'Duplicate message id: ' + (0, _chalk.red)(id));
        });
      } else {
        console.log((0, _chalk.green)('  No duplicate ids found, great!'));
      }
      (0, _printer.footer)();
    },

    printLanguageReport: function printLanguageReport(langResults) {
      (0, _printer.header)('Maintaining ' + (0, _chalk.yellow)(langResults.languageFilename) + ':');
      (0, _printResults2.default)(_extends({}, langResults.report, { sortKeys: sortKeys }));
    },

    printNoLanguageFile: function printNoLanguageFile(langResults) {
      (0, _printer.subheader)('\n        No existing ' + langResults.languageFilename + ' translation file found.\n        A new one is created.\n      ');
    },

    printNoLanguageWhitelistFile: function printNoLanguageWhitelistFile(langResults) {
      (0, _printer.subheader)(''(_templateObject2, langResults)(_templateObject));
    }
  };

  var printers = _extends({}, defaultPrinters, overridePrinters);

  var stringifyOpts = _extends({}, defaultJSONOptions, jsonOptions, {
    sortKeys: sortKeys
  });

  var defaultCoreMethods = {
    provideExtractedMessages: function provideExtractedMessages() {
      return (0, _readMessageFiles2.default)(messagesDirectory);
    },

    outputSingleFile: function outputSingleFile(combinedFiles) {
      if (singleMessagesFile) {
        (0, _createSingleMessagesFile2.default)({
          messages: combinedFiles,
          directory: translationsDirectory,
          sortKeys: sortKeys
        });
      }
    },

    outputDuplicateKeys: function outputDuplicateKeys(duplicateIds) {
      if (!detectDuplicateIds) return;

      printers.printDuplicateIds(duplicateIds);
    },

    beforeReporting: function beforeReporting() {
      (0, _mkdirp.sync)(translationsDirectory);
      (0, _mkdirp.sync)(whitelistsDirectory);
    },

    provideLangTemplate: function provideLangTemplate(lang) {
      var languageFilename = lang + '.json';
      var languageFilepath = _path2.default.join(translationsDirectory, languageFilename);
      var whitelistFilename = 'whitelist_' + lang + '.json';
      var whitelistFilepath = _path2.default.join(whitelistsDirectory, whitelistFilename);

      return {
        lang: lang,
        languageFilename: languageFilename,
        languageFilepath: languageFilepath,
        whitelistFilename: whitelistFilename,
        whitelistFilepath: whitelistFilepath
      };
    },

    provideTranslationsFile: function provideTranslationsFile(langResults) {
      var jsonFile = (0, _readFile2.default)(langResults.languageFilepath);
      return jsonFile ? JSON.parse(jsonFile) : undefined;
    },

    provideWhitelistFile: function provideWhitelistFile(langResults) {
      var jsonFile = (0, _readFile2.default)(langResults.whitelistFilepath);
      return jsonFile ? JSON.parse(jsonFile) : undefined;
    },

    reportLanguage: function reportLanguage(langResults) {
      if (!langResults.report.noTranslationFile && !langResults.report.noWhitelistFile) {
        printers.printLanguageReport(langResults);

        (0, _fs.writeFileSync)(langResults.languageFilepath, (0, _stringify2.default)(langResults.report.fileOutput, stringifyOpts));
        (0, _fs.writeFileSync)(langResults.whitelistFilepath, (0, _stringify2.default)(langResults.report.whitelistOutput, stringifyOpts));
      } else {
        if (langResults.report.noTranslationFile) {
          printers.printNoLanguageFile(langResults);
          (0, _fs.writeFileSync)(langResults, (0, _stringify2.default)(langResults.report.fileOutput, stringifyOpts));
        }

        if (langResults.report.noWhitelistFile) {
          printers.printNoLanguageWhitelistFile(langResults);
          (0, _fs.writeFileSync)(langResults.whitelistFilepath, (0, _stringify2.default)([], stringifyOpts));
        }
      }
    },

    afterReporting: function afterReporting() {}
  };

  (0, _core2.default)(languages, _extends({}, defaultCoreMethods, overrideCoreMethods));
};