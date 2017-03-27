const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.base')(config);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const hotReload = require('path').resolve(__dirname, './hot-reload')

// 添加热重载
Object.keys(baseWebpackConfig.entry).forEach((name) => {
    baseWebpackConfig.entry[name] = [hotReload].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env
        }),
        // 用于热重载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
})
