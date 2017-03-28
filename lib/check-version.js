const request = require('request');
const semver = require('semver');
const chalk = require('chalk');
const ora = require('ora');
const packageConfig = require('../package.json')
const logModule = require('./log');
const log = logModule.log;
const logSuccess = logModule.logSuccess;
const logBoundary = logModule.logBoundary;
const logLine = logModule.logLine;

module.exports = () => {
    let spinner = ora('正在检查tofu-cli版本，请稍候...');
    spinner.start();

    return new Promise((resolve, reject) => {
        if (!semver.satisfies(process.version, packageConfig.engines.node)) {
            spinner.stop();
            log(
                '    你必须升级Node版本至 >=' + packageConfig.engines.node + '.x 才能使用tofu-cli'
            , 'red');
            reject();
        }

        request({
            url: 'https://registry.npm.taobao.org/tofu-cli',
            timeout: 10000
        }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                spinner.stop();
                log();
                logSuccess('Node版本符合使用要求'); // 等spinner结束后再打印消息

                const latestVersion = JSON.parse(body)['dist-tags'].latest
                const localVersion = packageConfig.version
                // const localVersion = '0.0.1';

                let rst;
                if (semver.lt(localVersion, latestVersion)) {
                    log();
                    logBoundary('yellow');
                    log();                  
                    log('  tofu-cli有更新', 'yellow');
                    log();
                    logLine([
                        { message: '  latest:    '},
                        { message: latestVersion, color: 'green' }
                    ])
                    logLine([
                        { message: '  installed: ' },
                        { message: localVersion, color: 'red' }
                    ])
                    log();
                    log("  你可以在结束后输入tofu update来更新tofu-cli", 'white');
                    log();
                    logBoundary('yellow');
                    log();

                    rst = false;
                } else {
                    logSuccess('tofu-cli为最新版本');
                    rst = true;
                }
                resolve(rst);
            }
        })
    })
}