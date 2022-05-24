const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = path.resolve(__dirname, './../../');
const sass = path.resolve(root, './main/assets/scss');
const images = path.resolve(__dirname, '../src/main/assets/images');
const locales = path.resolve(__dirname, '../src/main/assets/locales');

const copyImages = new CopyWebpackPlugin({
  patterns: [{ from: images, to: 'img' }],
});

const copyLocales = new CopyWebpackPlugin({
  patterns: [{ from: locales, to: 'assets/locales' }],
});

module.exports = {
  paths: { root, sass },
  plugins: [copyImages, copyLocales],
};
