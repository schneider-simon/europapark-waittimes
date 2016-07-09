var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './public/src/main.js',
    output: {
        path: __dirname + "/public/dist",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new LiveReloadPlugin({})
    ]
};