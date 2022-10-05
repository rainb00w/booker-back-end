module.exports = {
  plugins: [
    "regexp"
  ],
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier', "plugin:regexp/no-useless-escape"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
}
