const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = require.resolve('@hmcts/frontend/package.json');
const root = path.resolve(packageJson, '..');
const assets = path.resolve(root, 'assets');
const images = path.resolve(assets, 'images');

const copyTemplateAssets = new CopyWebpackPlugin({
  patterns: [{ from: images, to: 'hmcts-assets/images' }],
});

module.exports = {
  paths: { template: root, assets },
  plugins: [copyTemplateAssets],
};
