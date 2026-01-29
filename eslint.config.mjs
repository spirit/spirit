import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['test/', 'lib/', 'dist/', 'webpack.config.js', 'wallaby.config.js']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env']
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.es2021
      }
    },
    rules: {
      'quotes': ['error', 'single'],
      'space-before-function-paren': ['error', 'never'],
      'padded-blocks': ['error', 'never']
    }
  },
  eslintConfigPrettier
];
