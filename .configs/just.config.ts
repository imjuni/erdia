/* eslint-disable import/no-extraneous-dependencies */
import { option, series, task } from 'just-scripts';
import { exec } from 'just-scripts-utils';

option('env', { default: { env: process.env.RUN_MODE } });

task('clean', async () => {
  const cmd = 'rimraf dist artifact';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('clean:dts', async () => {
  const cmd = 'rimraf dist/src dist/example dataSourceConfig.d.ts';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('clean:doc', async () => {
  const files = [
    'erdiagram.md',
    'table.md',
    'erdiagram.html',
    'table.html',
    'erdiagram.pdf',
    'table.pdf',
    'erdiagram.svg',
    'erdiagram.png',
  ];

  const cmd = `rimraf ${files.join(' ')}`;
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+build', async () => {
  const cmd = 'tsc --incremental';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+dts-bundle', async () => {
  const cmd = 'dts-bundle-generator --no-check --no-banner dist/src/erdia.d.ts -o dist/erdia.d.ts';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+webpack:prod', async () => {
  const cmd = 'cross-env NODE_ENV=production webpack --config ./.configs/webpack.config.prod.js';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+webpack:dev', async () => {
  const cmd = 'cross-env NODE_ENV=production webpack --config ./.configs/webpack.config.dev.js';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+pub', async () => {
  const cmd = 'npm publish --registry http://localhost:8901 --force';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+pub:prod', async () => {
  const cmd = 'npm publish';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('lint', async () => {
  const cmd = 'eslint --cache --ext ts,tsx .';
  const resp = await exec(cmd, { stderr: process.stderr, stdout: process.stdout });

  if (resp !== '') {
    throw new Error(`lint error: \n${resp}`);
  }
});

task('test', async () => {
  const cmd = 'jest --runInBand';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-html', async () => {
  const cmd = 'ts-node src/cli.ts html -d ./dataSourceConfig.ts -o table.html -o erdiagram.html';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-md', async () => {
  const cmd = 'ts-node src/cli.ts md --html-br -v -d ./dataSourceConfig.ts -o table.md -o erdiagram.md';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-pdf', async () => {
  const cmd = 'ts-node src/cli.ts pdf -d ./dataSourceConfig.ts -o table.pdf -o erdiagram.pdf';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-svg', async () => {
  const cmd = 'ts-node src/cli.ts image -d ./dataSourceConfig.ts -o erdiagram.svg';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-png', async () => {
  const cmd = 'ts-node src/cli.ts image -d ./dataSourceConfig.ts -o erdiagram.png --image-format png';
  await exec(cmd, { stderr: process.stderr, stdout: process.stdout });
});

task('ddh', series('clean:doc', '+do-dev-html'));
task('ddm', series('clean:doc', '+do-dev-md'));
task('ddp', series('clean:doc', '+do-dev-pdf'));
task('dds', series('clean:doc', '+do-dev-svg'));
task('ddn', series('clean:doc', '+do-dev-png'));

task('build', series('clean', '+build'));
task('webpack:dev', series('clean', 'lint', '+webpack:dev', '+dts-bundle', 'clean:dts'));
task('webpack:prod', series('clean', 'lint', '+webpack:prod', '+dts-bundle', 'clean:dts'));
task('pub', series('clean', '+webpack:prod', '+pub'));
task('pub:prod', series('clean', '+webpack:prod', '+pub:prod'));
