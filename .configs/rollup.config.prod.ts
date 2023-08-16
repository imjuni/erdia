import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import readPackage from 'read-pkg';
import { swc } from 'rollup-plugin-swc3';

const pkg = readPackage.sync();

const resolveOnly = (module) => {
  return (
    pkg?.dependencies?.[module] != null &&
    pkg?.devDependencies?.[module] != null &&
    pkg?.peerDependencies?.[module] != null
  );
};

export default [
  {
    input: 'src/cli.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ resolveOnly }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        compilerOptions: {
          sourceMap: true,
        },
      }),
      swc(),
    ],
  },
];
