const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// -----------------------------------------------------------------------------
// PRODUCTION BUILD
// -----------------------------------------------------------------------------

console.log('-----------------');
console.log('PRODUCTION BUILD');
console.log('-----------------');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: [ './src/app.js', './src/style/root.scss' ],

    output: {
        path: path.resolve(__dirname, 'dist'),
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
                options: {
                    reactivityTransform: true,
                }
            },
            {
                test: /\.(s?)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
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
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets' }
            ]
        }),
        // exclude VueLoaderPlugin() when using MiniCssExtractPlugin()
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new VueLoaderPlugin(),
        // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
};
