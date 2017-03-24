const exists = require('fs').existsSync;
const resolveCwd = require('./utils').resolveCwd;

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
        console.log('1')
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
    return checkMain() && checkPackageJson();
}