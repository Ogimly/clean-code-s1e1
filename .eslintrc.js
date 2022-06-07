module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['prettier'],

  rules: {},

  ignorePatterns: ['*.html', '*config.js'],
};
