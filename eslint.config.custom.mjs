export const tsFiles = ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx', '**/*.d.ts'];

export const customEslintRule = [
  {
    rules: {
      // ----------------------------------------------------------------------------------------------------------
      // eslint
      // ----------------------------------------------------------------------------------------------------------
      'no-await-in-loop': 'off',
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
    },
  },
];

export const customOverrideImportXPlugin = [
  // ----------------------------------------------------------------------------------------------------------
  // eslint-plugin-import-x
  // ----------------------------------------------------------------------------------------------------------
  {
    rules: {
      'import-x/prefer-default-export': 'off',
      'import-x/no-default-export': 'error',
    },
  },
  {
    files: ['vitest.config.{ts,mts}'],
    rules: {
      'import-x/prefer-default-export': ['error'],
      'import-x/no-default-export': ['off'],
    },
  },
];

export const customOverrideEslintRule = [
  {
    // CLI entry point: process.exit() and sync I/O are acceptable
    files: ['src/cli.ts'],
    rules: {
      'n/no-process-exit': 'off',
      'n/no-sync': 'off',
    },
  },
  {
    files: ['**/scripts/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/CE_*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'no-restricted-syntax': 'off',
    },
  },
  {
    files: ['**/__tests__/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-namespace': 'off',
      'n/no-sync': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['src/modules/loggers/Logger.ts'],
    rules: {
      'class-methods-use-this': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['vitest.config.ts', 'eslint.config.mjs', 'eslint.config.custom.mjs'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import-x/no-default-export': 'off',
      'import-x/extensions': 'off',
      'import-x/no-rename-default': 'off',
      'import-x/order': 'off',
    },
  },
  {
    files: ['prepublish.cjs'],
    rules: {
      'no-console': 'off',
      'n/no-process-exit': 'off',
    },
  },
  {
    // These files use any-typed libraries (alasql, TypeORM internals) that require unsafe return suppression
    files: [
      'src/creators/getRenderData.ts',
      'src/templates/modules/getTemplates.ts',
      'src/templates/modules/loadTemplates.ts',
      'src/typeorm/indices/getIndexRecords.ts',
      'src/typeorm/loadDataSource.ts',
    ],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      'guard-for-in': 'off',
    },
  },
  {
    // CLI config loading uses readFileSync intentionally at startup
    files: ['src/configs/modules/preLoadConfig.ts'],
    rules: {
      'n/no-sync': 'off',
    },
  },
  {
    files: ['src/templates/modules/__tests__/template.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    files: ['.configs/*.mjs', '.configs/*.cjs'],
    rules: {
      'no-console': 'off',
      'n/no-process-exit': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-namespace': 'off',
      'import-x/no-default-export': 'off',
      'arrow-body-style': 'off',
    },
  },
];

export const customIgnore = [
  {
    ignores: ['dist/**/*', 'erdia-docs/**/*', 'coverage/**/*', 'examples/**/*'],
  },
];

export const customTsconfig = {
  files: tsFiles,
  languageOptions: {
    parserOptions: {
      projectService: false,
      project: ['./tsconfig.eslint.json'],
    },
  },
};

export const customTypescriptRule = [
  {
    name: 'project/custom/typescript/rules',
    files: tsFiles,
    rules: {
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
      // Disabled: too many existing violations; enable incrementally
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
