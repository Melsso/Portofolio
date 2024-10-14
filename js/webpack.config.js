const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname), // Add this line to set context explicitly
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development', // Ensure this is set properly
  resolve: {
    extensions: ['.js'], // Allow importing files without specifying extensions
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APIKEY': JSON.stringify(process.env.APIKEY),
      'process.env.SERVICEID': JSON.stringify(process.env.SERVICEID),
      'process.env.TEMPLATEID': JSON.stringify(process.env.TEMPLATEID),
    }),
  ],
};
