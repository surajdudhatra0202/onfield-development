import pkg from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

const { configs } = pkg;  // Destructure after importing the default export

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        __DEV__: true,
      },
    },
    plugins: {
      '@typescript-eslint': pkg,
      react: reactPlugin,
      'react-native': reactNativePlugin,
      'unused-imports': unusedImportsPlugin,
      import: importPlugin,
    },
    rules: {
      ...configs.recommended.rules,  // Now using the configs correctly
      '@typescript-eslint/no-unused-vars': 'error',
      'react/prop-types': 'off',
      'react/jsx-key': 'off',
      'unused-imports/no-unused-imports': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',
      'react-native/no-raw-text': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/sort-styles': [
        'error',
        'asc',
        { ignoreClassNames: false, ignoreStyleProperties: false },
      ],
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
    },
  },
];
