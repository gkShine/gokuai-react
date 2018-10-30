module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  settings: {
    react: {
      version: '16.6.0'
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: [
    "react"
  ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "no-debugger": 0
  }
}
