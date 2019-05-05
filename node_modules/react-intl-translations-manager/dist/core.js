'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDefaultMessages = require('./getDefaultMessages');

var _getDefaultMessages2 = _interopRequireDefault(_getDefaultMessages);

var _getLanguageReport = require('./getLanguageReport');

var _getLanguageReport2 = _interopRequireDefault(_getLanguageReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (languages, hooks) {
  var provideExtractedMessages = hooks.provideExtractedMessages,
      outputSingleFile = hooks.outputSingleFile,
      outputDuplicateKeys = hooks.outputDuplicateKeys,
      beforeReporting = hooks.beforeReporting,
      provideLangTemplate = hooks.provideLangTemplate,
      provideTranslationsFile = hooks.provideTranslationsFile,
      provideWhitelistFile = hooks.provideWhitelistFile,
      reportLanguage = hooks.reportLanguage,
      afterReporting = hooks.afterReporting;


  var extractedMessages = provideExtractedMessages();

  if (typeof outputSingleFile === 'function') {
    outputSingleFile(extractedMessages);
  }

  var defaultMessages = (0, _getDefaultMessages2.default)(extractedMessages);

  if (typeof outputDuplicateKeys === 'function') {
    outputDuplicateKeys(defaultMessages.duplicateIds);
  }

  if (typeof beforeReporting === 'function') beforeReporting();

  languages.forEach(function (lang) {
    var langResults = provideLangTemplate(lang);

    var file = provideTranslationsFile(langResults);
    var whitelistFile = provideWhitelistFile(langResults);

    if (!file) langResults.noTranslationFile = true;
    if (!whitelistFile) langResults.noWhitelistFile = true;

    langResults.report = (0, _getLanguageReport2.default)(defaultMessages.messages, file, whitelistFile);

    if (typeof reportLanguage === 'function') reportLanguage(langResults);
  });

  if (typeof afterReporting === 'function') afterReporting();
};