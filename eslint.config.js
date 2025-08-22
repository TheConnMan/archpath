import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      // Core JavaScript rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',

      // Svelte-specific rules (more relaxed for educational game)
      'svelte/no-at-debug-tags': 'warn',
      'svelte/no-at-html-tags': 'error',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/valid-compile': 'error',
      'svelte/require-each-key': 'warn', // Warn instead of error for game simplicity
      'svelte/no-immutable-reactive-statements': 'warn',

      // Code quality (relaxed for game context)
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'], // Allow single-line if statements
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
  {
    files: [
      '**/*.config.js',
      '**/vite.config.js',
      '**/tailwind.config.js',
      '**/playwright.config.js',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
  },
  {
    files: ['tests/**/*.js', '**/*.spec.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off', // Allow console in tests
      'no-unused-vars': 'warn', // More lenient in tests
    },
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.svelte-kit/',
      'playwright-report/',
      'test-results/',
      '.claude/',
    ],
  },
];
