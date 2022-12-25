const RELEASE_MODE = process.env.RELEASE_MODE === 'true';

if (RELEASE_MODE === false) {
  console.log('Run `npm run release` to publish the package');
  process.exit(1); // which terminates the publish process
}
