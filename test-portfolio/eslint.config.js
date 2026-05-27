const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      '*.log',
      '.env',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        node: true,
        console: true,
        require: true,
        module: true,
        __dirname: true,
        __filename: true,
        process: true,
        describe: true,
        test: true,
        expect: true,
        it: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
      },
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
