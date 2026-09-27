module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  env: {browser: true, es6: true, node: true},
  globals: {__APP_VERSION__: 'readonly'}, // injected by vite.config.js
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['prettier', 'react'],
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
  overrides: [
    // eslint-plugin-import can't follow vitest's bundled re-exports
    {files: ['*.test.js'], rules: {'import/named': 'off'}},
  ],
};
