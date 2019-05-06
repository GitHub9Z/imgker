module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'no-eval': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0,
    'indent': 0,
    'no-multiple-empty-lines': 0,
    'eol-last': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
