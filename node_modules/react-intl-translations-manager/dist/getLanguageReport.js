"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// returns stats for a specific language
// - added: contains all added messages
// - untranslated: contains all untranslated messages
// - deleted: contains all deleted messages
// - fileOutput: contains output for the new language file
//               a single object with all added and untranslated messages
//               in a key (messageKey) value (message) format
// - whitelistOutput: contains output for the new languageWhitelist file
//                    all previously whitelisted keys, without the deleted keys
//
// {
//   added: [],
//   untranslated: [],
//   deleted: [],
//   fileOutput: {},
//   whitelistOutput: [],
// }
//
// every message is declared in the following format
// {
//   key: 'unique_message_key',
//   message: 'specific_message',
// }

var getCleanReport = exports.getCleanReport = function getCleanReport() {
  return {
    added: [],
    untranslated: [],
    deleted: [],
    fileOutput: {},
    whitelistOutput: []
  };
};

exports.default = function (defaultMessages) {
  var languageMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var languageWhitelist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var result = getCleanReport();

  var defaultMessageKeys = Object.keys(defaultMessages);

  defaultMessageKeys.forEach(function (key) {
    var oldMessage = languageMessages[key];
    var defaultMessage = defaultMessages[key];

    if (oldMessage) {
      result.fileOutput[key] = oldMessage;

      if (oldMessage === defaultMessage) {
        if (languageWhitelist.indexOf(key) === -1) {
          result.untranslated.push({
            key: key,
            message: defaultMessage
          });
        } else {
          result.whitelistOutput.push(key);
        }
      }
    } else {
      result.fileOutput[key] = defaultMessage;

      result.added.push({
        key: key,
        message: defaultMessage
      });
    }
  });

  // if the key is still in the language file but no longer in the
  // defaultMessages file, then the key was deleted.
  result.deleted = Object.keys(languageMessages).filter(function (key) {
    return defaultMessageKeys.indexOf(key) === -1;
  }).map(function (key) {
    return {
      key: key,
      message: languageMessages[key]
    };
  });

  return result;
};