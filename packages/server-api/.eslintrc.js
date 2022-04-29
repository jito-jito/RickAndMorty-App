module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-undef': 'off',
    'no-throw-literal': 'off',
    'no-useless-catch': 'off'
  }
}
