module.exports = {
  root: true,
  
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // or vue3-essential for less strict
    'prettier'
  ],

  plugins: [
    'vue',
    'prettier'
  ],

  rules: {
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
    
    // Options API friendly rules
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    
    // General rules
    'prefer-promise-reject-errors': 'off',
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  globals: {
    ga: 'readonly',
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  }
}