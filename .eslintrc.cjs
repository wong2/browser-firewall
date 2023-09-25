module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "preact"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
  },
  root: true,
  rules: {
    "jest/no-deprecated-functions": 0,
  },
};
