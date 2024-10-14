const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SERVICEID': JSON.stringify(process.env.SERVICEID),
            'process.env.TEMPLATEID': JSON.stringify(process.env.TEMPLATEID),
            'process.env.APIKEY': JSON.stringify(process.env.APIKEY),
        }),
    ],
};