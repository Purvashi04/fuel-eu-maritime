module.exports = [
  {
    ignores: ["dist"]
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: { sourceType: "module" }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  }
];
