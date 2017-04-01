const path = require('path');
const cwd = process.cwd();
const config = require(path.posix.join(cwd, './config.js'));

module.exports = {
    env: { NODE_ENV: '"development"' },
    port: config.devPort,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: config.devProxy,
    cssSourceMap: false,
    alias: config.alias
}