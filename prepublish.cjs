const RELEASE_MODE = process.env.RELEASE_MODE === "true";

if (RELEASE_MODE === false) {
  console.log("Run `npm run release` to publish the package");
  // Exit to terminate the publish process.
  process.exit(1);
}
