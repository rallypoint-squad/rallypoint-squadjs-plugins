import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      curly: 'error',
      indent: [
        'error',
        2
      ],
      'no-multi-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      'space-before-blocks': [
        'error',
        {
          classes: 'always',
          keywords: 'always',
          functions: 'always',
        }
      ]
    }
  }
];
