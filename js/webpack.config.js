const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APIKEY': JSON.stringify(process.env.APIKEY),
      'process.env.SERVICEID': JSON.stringify(process.env.SERVICEID),
      'process.env.TEMPLATEID': JSON.stringify(process.env.TEMPLATEID),
    })
  ]
};
