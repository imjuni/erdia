module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_.+$',
        argsIgnorePattern: '^_.+$',
        ignoreRestSiblings: true,
      },
    ],
    'import/extensions': ['off'],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    // static function use this: void
    '@typescript-eslint/no-invalid-void-type': ['error', { allowAsThisParameter: true }],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
  overrides: [
    {
      files: ['**/__test__/*.ts', '**/__tests__/*.ts', 'jest.config.cjs'],
      rules: {
        '@typescript-eslint/no-unsafe-call': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-argument': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
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
      files: ['**/*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
        'import/no-extraneous-dependencies': ['off'],
      },
    },
    {
      files: ['src/cli.ts'],
      rules: {
        '@typescript-eslint/ban-types': ['off'],
      },
    },
    {
      files: ['examples/class-type/**/*.ts', 'examples/schema-type/**/*.ts'],
      rules: {
        '@typescript-eslint/consistent-type-imports': ['off'],
      },
    },
    {
      files: ['src/creators/writeToImage.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        'no-param-reassign': ['off'],
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
