const path = require('path');
const resolveCwd = require('../../lib/utils').resolveCwd;
const config = resolveCwd('./config.js')

module.exports = {
    env: { NODE_ENV: '"production"' },
    index: resolveCwd('./dist/index.html'),
    assetsRoot: resolveCwd('./dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    zipPath: config.zipPath
}