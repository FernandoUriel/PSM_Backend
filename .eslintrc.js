module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    es6: true
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }]
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
}
