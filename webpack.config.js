var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    target: 'web',
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
                exclude: path.resolve(__dirname, "node_modules"),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/, loaders: ["style", "css", "sass"]
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({IN_BROWSER: true}),
        new LiveReloadPlugin({})
    ],
    externals: [
        (function () {
            var IGNORES = [
                'fs', 'child_process'

            ];
            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        })()
    ]
};