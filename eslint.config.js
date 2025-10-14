import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    parser: '@babel/eslint-parser', // use Babel parser for JSX
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    plugins: ['react', 'react-hooks'],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      reactHooks.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't need React import
    },
  },
]);
