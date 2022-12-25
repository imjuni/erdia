import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { getTsconfig } from 'get-tsconfig';
import readPackage from 'read-pkg';
import ts from 'rollup-plugin-ts';

const pkg = readPackage.sync();
const tsconfig = getTsconfig('tsconfig.prod.json');

if (tsconfig == null || tsconfig.config == null) {
  throw new Error('Cannot foud tsconfig.prod.json, or invalid compiler options');
}

export default [
  {
    input: 'src/cli.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cli.js',
        banner: '#!/usr/bin/env node',
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return (
            pkg?.dependencies?.[module] == null &&
            pkg?.devDependencies?.[module] == null &&
            pkg.peerDependencies?.[module] == null
          );
        },
      }),
      ts({
        tsconfig: {
          ...((tsconfig.config.compilerOptions as Record<string, string>) ?? {}),
          declaration: false,
        },
      }),
      terser(),
    ],
  },
  {
    input: 'src/erdia.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cjs/index.cjs',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: 'dist/esm/index.mjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return (
            pkg?.dependencies?.[module] == null &&
            pkg?.devDependencies?.[module] == null &&
            pkg.peerDependencies?.[module] == null
          );
        },
      }),
      ts({
        tsconfig: {
          ...((tsconfig.config.compilerOptions as Record<string, string>) ?? {}),
          declaration: true,
          sourceMap: true,
        },
      }),
    ],
  },
];
