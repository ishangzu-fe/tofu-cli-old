const exists = require('fs').existsSync;
const resolveCwd = require('./utils').resolveCwd;
const logModule = require('./log');
const log = logModule.log;
const logSuccess = logModule.logSuccess;
const logFail = logModule.logFail;

module.exports = () => {
    if (exists(resolveCwd('node_modules'))) {
        logSuccess('依赖检查通过');
        log();
        return true;
    } else {
        logFail('请安装依赖后再继续：');
        log();
        log('    npm install（或者 yarn install, cnpm install)', 'white');
        log();
        return false;
    }
}