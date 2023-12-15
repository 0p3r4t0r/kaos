const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// -----------------------------------------------------------------------------
// DEPLOYMENT BUILD
// -----------------------------------------------------------------------------

console.log('-----------------');
console.log('DEVELOPMENT BUILD');
console.log('-----------------');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: [ './src/app.js', './src/style/root.scss' ],

    devServer: {
        allowedHosts: [ 'all' ],
        static: {
            directory: path.join(__dirname, 'devdist'),
        },
        compress: true,
        port: 9000,
    },

    output: {
        path: path.resolve(__dirname, 'devdist'),
        filename: 'app.js',
    },

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            globals: path.resolve(__dirname, 'src/globals'),
            style: path.resolve(__dirname, 'src/style'),
            components: path.resolve(__dirname, 'src/components'),
            engine: path.resolve(__dirname, 'src/engine'),
            input: path.resolve(__dirname, 'src/input'),
        },
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(s?)css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ],
    },

    plugins: [
        // CleanWebpackPlugin() must be first!
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'assets' }
        ]),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        })
    ],
};
