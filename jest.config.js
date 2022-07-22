/* eslint-disable import/no-extraneous-dependencies */
const { pathsToModuleNameMapper } = require('ts-jest');
const { parse } = require('jsonc-parser');
const fs = require('fs');
const path = require('path');

// https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/#jest-config-with-helper
// ctix tsconfig.json file have comment line so need jsonc-parser
const tsconfig = parse(fs.readFileSync('./tsconfig.json').toString());

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/*.(ts|tsx)', '**/__test__/*.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', 'example', 'dist'],
  setupFilesAfterEnv: [path.join('<rootDir>', '.configs', 'jest.setup.js')],
  // testSequencer: './.config/test.spec.cjs',
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
