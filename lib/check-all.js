const ora = require('ora');

const checkDir = require('./check-dir');
const checkTofu = require('./check-tofu');
const checkModules = require('./check-modules');

module.exports = async (done) => {
    let passTofu; // tofu框架检查结果
    let passModules; // 检查node_modules结果

    if (!checkDir()) {
        return false;
    } else {
        await checkTofu();
        if (!checkModules()) {
            return false;
        } else {
            done && done();
        }
    }
}