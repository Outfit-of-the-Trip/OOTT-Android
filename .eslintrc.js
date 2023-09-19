module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  parser: '@babel/eslint-parser',
  parserOptions: {requireConfigFile: 'false'},
  babelOptions: {configFile: './.babelrc'},
};
