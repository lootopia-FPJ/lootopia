import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'


export default [
  {
    ignores: ['dist', 'node_modules','eslint.config.js'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'], 
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module', 
      parser: tseslint.parser, 
      parserOptions: {
        ecmaFeatures: {
          jsx: true, 
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react, 
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier, 
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error', 
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off', 
      'no-console': ['error', { allow: ['warn', 'error'] }], 
    },
  },
]
