module.exports = {
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: ['__test__/*', '__tests__/*', 'examples/*', 'coverage/*', 'dist/*', 'vitest.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    // ----------------------------------------------------------------------------------------------------------
    // eslint
    // ----------------------------------------------------------------------------------------------------------
    'max-len': [
      'error',
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        code: 120,
      },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration:not([const=true])',
        message: "Don't declare non-const enums",
      },
    ],
    // ----------------------------------------------------------------------------------------------------------
    // @typescript-eslint
    // ----------------------------------------------------------------------------------------------------------
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]+',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]+',
          match: true,
        },
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_.+$',
        argsIgnorePattern: '^_.+$',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    // ----------------------------------------------------------------------------------------------------------
    // eslint-plugin-import
    // ----------------------------------------------------------------------------------------------------------
    'import/prefer-default-export': ['off'],
    'import/no-default-export': ['error'],
  },
  overrides: [
    {
      files: ['**/scripts/*.js'],
      rules: {
        'no-console': ['off'],
      },
    },
    {
      files: ['**/CE_*.ts'],
      rules: {
        '@typescript-eslint/no-redeclare': ['off'],
        '@typescript-eslint/naming-convention': ['off'],
      },
    },
    {
      files: ['**/__tests__/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-argument': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/ban-ts-comment': ['off'],
        'no-console': ['off'],
      },
    },
    {
      files: ['src/modules/loggers/Logger.ts'],
      rules: {
        'class-methods-use-this': ['off'],
        '@typescript-eslint/consistent-type-imports': ['off'],
        '@typescript-eslint/no-redundant-type-constituents': ['off'],
        '@typescript-eslint/no-unsafe-argument': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },
    {
      files: ['vitest.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['off'],
        'import/no-default-export': ['off'],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.eslint.json',
      },
    },
  },
};
