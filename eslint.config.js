import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  js.configs.recommended,
  react.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {ecmaFeatures: {jsx: true}},
      globals: {
        ...globals.browser,
        ...globals.node,
        __APP_VERSION__: 'readonly', // injected by vite.config.js
      },
    },
    plugins: {prettier: prettierPlugin},
    rules: {
      'prettier/prettier': ['warn', {singleQuote: true, bracketSpacing: false}],
      'dot-notation': 'warn',
      'quote-props': ['warn', 'as-needed'],
      'arrow-body-style': ['warn', 'as-needed'],
      'object-shorthand': 'warn',
      'no-use-before-define': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
    },
    settings: {
      react: {version: 'detect'},
      'import/resolver': {node: {extensions: ['.js', '.jsx']}},
    },
  },
  {
    // eslint-plugin-import can't follow vitest's bundled re-exports
    files: ['**/*.test.js'],
    rules: {'import/named': 'off'},
  },
];
