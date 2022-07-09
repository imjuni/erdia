const { merge } = require('webpack-merge');
const tsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const devConfig = require('./webpack.config.dev');

const [appDevConfig, cliDevConfig] = devConfig;

const appConfig = merge(appDevConfig, {
  mode: 'production',
  resolve: {
    plugins: [
      new tsconfigPathsWebpackPlugin({
        configFile: 'tsconfig.prod.json',
      }),
    ],
  },
});

const cliConfig = merge(cliDevConfig, {
  mode: 'production',
  resolve: {
    plugins: [
      new tsconfigPathsWebpackPlugin({
        configFile: 'tsconfig.prod.json',
      }),
    ],
  },
});

module.exports = [appConfig, cliConfig];
