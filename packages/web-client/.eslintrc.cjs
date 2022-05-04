/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  "env": {
    "vue/setup-compiler-macros": true,
  },
  "rules": {
    "vue/multi-word-component-names": 'off',
    "vue/no-multiple-template-root": 'off',
    "vue/no-dupe-keys": 'off',
    "no-useless-catch": 'off'
  }
}
