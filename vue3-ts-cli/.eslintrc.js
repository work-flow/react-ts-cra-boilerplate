module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/essential',
    // 'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-new': 'off',
    'new-cap': 'off',
    'no-debugger': 'off'
  }
}
