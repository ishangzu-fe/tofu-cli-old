const request = require('request');
const semver = require('semver');
const chalk = require('chalk');
const ora = require('ora');
const log =require('./log').log;
const logBoundary = require('./log').logBoundary;
const packageConfig = require('../package.json')

module.exports = (done) => {
    let spinner = ora('正在检查tofu-cli版本，请稍候...');
    spinner.start();

    return new Promise((resolve, reject) => {
        if (!semver.satisfies(process.version, packageConfig.engines.node)) {
            spinner.stop();
            resolve();
            return log(
                '    你必须升级Node版本至 >=' + packageConfig.engines.node + '.x 才能使用tofu-cli'
            , 'red');
        }

        request({
            url: 'https://registry.npm.taobao.org/tofu-cli',
            timeout: 10000
        }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                spinner.stop();
                const latestVersion = JSON.parse(body)['dist-tags'].latest
                const localVersion = packageConfig.version
                if (semver.lt(localVersion, latestVersion)) {
                    log();
                    console.log(chalk.yellow('  tofu-cli有更新'))
                    console.log()
                    console.log('  latest:    ' + chalk.green(latestVersion))
                    console.log('  installed: ' + chalk.red(localVersion))
                    console.log()
                    log("  你可以在结束后输入tofu update来更新tofu-cli", 'white');
                    log();
                    logBoundary('yellow');
                    log();
                }
                resolve();
            }
            done && done()
        })
    })
}