const eslint = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["coverage/**", "dist/**"],
  },
  eslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
  },
];
