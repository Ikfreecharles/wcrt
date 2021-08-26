const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: ['pages/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'hooks/**/*.ts'],
  output: './',
  options: {
    sort: true,
    func: {
      list: ['t'],
    },
    lngs: ['en', 'de'],
    ns: ['common', 'group'],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'public/static/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/static/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({ extensions: ['.ts', '.tsx'] }),
};
