const ora = require('ora');
const resolveCwd = require('./utils').resolveCwd;
const logModule = require('./log');
const log = logModule.log;
const logSuccess = logModule.logSuccess;
const logBoundary = logModule.logBoundary;
const logLine = logModule.logLine;
const request = require('request');
const semver = require('semver');
const chalk = require('chalk');
const packageConfig = require(resolveCwd('package.json'));

let tofuEdition = packageConfig.dependencies['i-tofu'];
tofuEdition = tofuEdition.match(/^[^0-9]*(.+)$/)[1];

module.exports = () => {
    let spinner = ora('正在检查i-tofu版本，请稍候...');
    spinner.start();

    return new Promise((resolve, reject) => {
        request({
            url: 'https://registry.npm.taobao.org/i-tofu',
            timeout: 10000
        }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                spinner.stop();
                const latestVersion = JSON.parse(body)['dist-tags'].latest
                const localVersion = tofuEdition
                // const localVersion = '0.0.1';

                let rst;
                if (semver.lt(localVersion, latestVersion)) {
                    log();
                    logBoundary('yellow');
                    log(); 
                    log('  i-tofu有更新', 'yellow');
                    log();
                    logLine([
                        { message: '  latest:    '},
                        { message: latestVersion, color: 'green' }
                    ])
                    logLine([
                        { message: '  installed: ' },
                        { message: localVersion, color: 'red' }
                    ])
                    log()
                    log("  你可以在结束后输入tofu update来更新i-tofu", 'white');
                    log();
                    logBoundary('yellow');
                    log();

                    rst = false;
                } else {
                    logSuccess('i-tofu为最新版本');
                    rst = true;
                }
                resolve(rst);
            }
        })
    })
}