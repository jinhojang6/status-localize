const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'src/i18n/messages/',
  translationsDirectory: 'src/i18n/locales/',
  languages: ['en', 'ko'] // any language you need
});