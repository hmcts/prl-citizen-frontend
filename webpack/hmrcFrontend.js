const path = require('path');

const root = path.resolve(__dirname, '../node_modules/hmrc-frontend/hmrc');
const sass = path.resolve(root, 'all.scss');
const javascript = path.resolve(root, 'all.js');
const components = path.resolve(root, 'components');


module.exports = {
  paths: { template: root, components, sass, javascript },
  plugins: [],
};
