const ora = require('ora');

const log = require('./log').log;
const logBoundary = require('./log').logBoundary;
const checkVersion = require('./check-version');
const checkDir = require('./check-dir');
const checkTofu = require('./check-tofu');
const checkModules = require('./check-modules');

module.exports = async (done) => {
    let passDir; // 目录检查结果
    let passTofu; // tofu框架检查结果
    let passModules; // 检查node_modules结果

    await checkVersion();

    let spinner = ora('正在检查项目目录...');
    spinner.start();
    passDir = await checkDir();
    spinner.stop();
    if (!passDir) {
        log('请检查当前目录是否为基于Tofu的项目目录！', 'red');
        log();
        return;
    } else {
        await checkTofu();
        let passModules = await checkModules();
        if (!passModules) {
            log('  请安装依赖后再继续：', 'red');
            log();
            log('    npm install（或者 yarn install, cnpm install)', 'white');
            log();
            logBoundary('red');
            log();
            return;
        } else {
            done && done();
        }
    }
}