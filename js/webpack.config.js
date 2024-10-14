const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    mode: 'production',
};