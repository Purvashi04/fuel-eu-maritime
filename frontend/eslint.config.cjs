module.exports = [
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: { ecmaVersion: 2020, sourceType: "module" }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  }
];
