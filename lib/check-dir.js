const exists = require('fs').existsSync;
const resolveCwd = require('./utils').resolveCwd;
const ora = require('ora');
const logModule = require('./log');
const logSuccess = logModule.logSuccess;
const logFail = logModule.logFail;

/**
 * 1.检查是否包含src文件夹
 * 2.检查src文件中是否包含main.js文件
 */
const checkMain = () => {
    const src = resolveCwd('./src');
    const main = resolveCwd('./src/main.js');

    if (exists(src) && exists(main)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 1.检查是否包含package.json
 * 2.检查package.json依赖
 */
const checkPackageJson = () => {
    const packageJson = resolveCwd('./package.json');
    if (exists(packageJson)) {
        const config = require(packageJson);
        let tofu = config.dependencies['i-tofu'];

        if (tofu) {
            return true;
        } else {
            return false;
        }
    } else {      
        return false;
    }
}

module.exports = () => {
    let spinner = ora('正在检查项目目录...');
    spinner.start();
    let rstMain = checkMain();
    let rstPackageJson = checkPackageJson();
    spinner.stop();

    if (rstMain && rstPackageJson) {
        logSuccess('项目目录符合要求');
        return true;
    } else {
        logFail('请检查项目目录')
        return false;
    }
}