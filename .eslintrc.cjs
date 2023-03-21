// .eslintrc.js

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
      extraFileExtensions: ['.svelte']
    },
    env: {
      es6: true,
      browser: true
    },
    overrides: [
      {
        files: ['*.svelte'],
        processor: 'svelte3/svelte3',
        rules: {
          "@typescript-eslint/no-unsafe-argument": "off"
        }
      }
    ],
    settings: {
      'svelte3/typescript': () => require('typescript'),
    },
    plugins: ['svelte3', '@typescript-eslint', 'unused-imports'],
    ignorePatterns: ['node_modules', 'dist', 'svelte.config.js'],
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
      ]
    }
  }