const path = require('path');
const resolveCwd = require('../../lib/utils').resolveCwd;
const config = require(resolveCwd('./config.js'));

module.exports = {
    env: { NODE_ENV: '"production"' },
    index: resolveCwd('./dist/index.html'),
    assetsRoot: resolveCwd('./dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    zipPath: config.zipPath
}