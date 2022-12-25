/* eslint-disable import/no-extraneous-dependencies */
import execa from 'execa';
import { logger, option, series, task } from 'just-task';

function splitArgs(args: string): string[] {
  return args
    .split(' ')
    .map((line) => line.trim())
    .filter((line) => line != null && line !== '');
}

option('env', { default: { env: process.env.RUN_MODE } });

task('clean', async () => {
  const cmd = 'rimraf';
  const option = 'dist artifact';

  logger.info('clean - ', cmd, option);

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('clean:dts', async () => {
  const cmd = 'rimraf';
  const option = 'dist/src dist/example dataSourceConfig.d.ts';

  logger.info('clean:dts - ', cmd, option);

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('clean:doc', async () => {
  const cmd = 'rimraf';
  const option = [
    'erdiagram.md',
    'table.md',
    'erdiagram.html',
    'table.html',
    'erdiagram.pdf',
    'table.pdf',
    'erdiagram.svg',
    'erdiagram.png',
  ];

  logger.info('clean:doc', cmd, option.join(' '));

  await execa(cmd, option, { stderr: process.stderr, stdout: process.stdout });
});

task('+build', async () => {
  const cmd = 'tsc';
  const option = '--incremental';

  logger.info('+build', cmd, option);

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+dts-bundle', async () => {
  const cmd = 'dts-bundle-generator';
  const option = '--no-check --no-banner dist/src/erdia.d.ts -o dist/erdia.d.ts';

  logger.info('+dts-bundle', cmd, option);

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+rollup:dev', async () => {
  const cmd = 'rollup';
  const option = '--config ./.configs/rollup.config.dev.ts --configPlugin ts --bundleConfigAsCjs';

  logger.info('Rollup: ', cmd, option);

  await execa(cmd, splitArgs(option), {
    env: {
      NODE_ENV: 'production',
    },
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+rollup:prod', async () => {
  const cmd = 'rollup';
  const option = '--config ./.configs/rollup.config.prod.ts --configPlugin ts --bundleConfigAsCjs';

  logger.info('Rollup: ', cmd, option);

  await execa(cmd, splitArgs(option), {
    env: {
      NODE_ENV: 'production',
    },
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+pub', async () => {
  const cmd = 'npm';
  const option = 'publish --registry http://localhost:8901 --force';

  logger.info('+pub', cmd, option);

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+pub:prod', async () => {
  const cmd = 'npm';
  const option = 'publish';

  logger.info('+pub:prod', cmd, option);

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('lint', async () => {
  const cmd = 'eslint';
  const option = '--cache --ext ts,tsx .';

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('prettier', async () => {
  const cmd = 'prettier';
  const option = '--write src/**/*.ts';

  await execa(cmd, splitArgs(option), {
    stderr: process.stderr,
    stdout: process.stdout,
  });
});

task('+do-dev-html', async () => {
  const cmd = 'ts-node';
  const option = 'src/cli.ts html -v -d ./dataSourceConfig.ts -o erdiagram.html -o table.html';

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-md', async () => {
  const cmd = 'ts-node';
  const option = 'src/cli.ts md --html-br -v -d ./dataSourceConfig.ts -o erdiagram.md -o table.md';

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-pdf', async () => {
  const cmd = 'ts-node';
  const option = 'src/cli.ts pdf -d ./dataSourceConfig.ts -o erdiagram.pdf -o table.pdf';

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-svg', async () => {
  const cmd = 'ts-node';
  const option = 'src/cli.ts image -d ./dataSourceConfig.ts -o erdiagram.svg';

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('+do-dev-png', async () => {
  const cmd = 'ts-node';
  const option = 'src/cli.ts image -d ./dataSourceConfig.ts -o erdiagram.png --image-format png';

  await execa(cmd, splitArgs(option), { stderr: process.stderr, stdout: process.stdout });
});

task('ddh', series('clean:doc', '+do-dev-html'));
task('ddm', series('clean:doc', '+do-dev-md'));
task('ddp', series('clean:doc', '+do-dev-pdf'));
task('dds', series('clean:doc', '+do-dev-svg'));
task('ddn', series('clean:doc', '+do-dev-png'));

task('build', series('clean', '+build'));
task('rollup:dev', series('clean', 'lint', '+rollup:dev'));
task('rollup:prod', series('clean', 'lint', '+rollup:prod'));
task('pub', series('clean', '+rollup:prod', '+pub'));
task('pub:prod', series('clean', '+rollup:prod', '+pub:prod'));
