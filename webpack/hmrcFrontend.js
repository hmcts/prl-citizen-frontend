const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const hmrcFrontendPath = path.resolve(__dirname, '../node_modules/hmrc-frontend');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(hmrcFrontendPath, 'hmrc'),
          to: 'assets/hmrc',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // Make Webpack resolve "hmrc-frontend" imports to the correct JS entry
      'hmrc-frontend': path.join(hmrcFrontendPath, 'hmrc')
    }
  }
};
