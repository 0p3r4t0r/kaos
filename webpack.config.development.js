const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

// -----------------------------------------------------------------------------
// DEVELOPMENT BUILD
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
            publicPath: '/kaos/',
        },
        compress: true,
        port: 9000,
    },

    output: {
        path: path.resolve(__dirname, 'devdist'),
        filename: 'app.js',
        clean: true,
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
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        // Disable unless testing, since it interferes with hot reloading
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true,
        //     maximumFileSizeToCacheInBytes: 3000000,
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets' }
            ]
        }),
        new VueLoaderPlugin(),
        // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        // Uncommnet to run bundle analyzer
        // new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
    ],
};
