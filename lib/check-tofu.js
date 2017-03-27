const ora = require('ora');
const resolveCwd = require('./utils').resolveCwd;
const log = require('./log').log;
const logBoundary = require('./log').logBoundary;
const request = require('request');
const semver = require('semver');
const chalk = require('chalk');
const packageConfig = require(resolveCwd('package.json'));

let tofuEdition = packageConfig.dependencies['i-tofu'];
tofuEdition = tofuEdition.match(/^[^0-9]+(.+)$/)[1];

module.exports = (done) => {
    let spinner = ora('正在检查tofu版本，请稍候...');
    spinner.start();

    return new Promise((resolve, reject) => {
        request({
            url: 'https://registry.npm.taobao.org/tofu',
            timeout: 10000
        }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                spinner.stop();
                const latestVersion = JSON.parse(body)['dist-tags'].latest
                const localVersion = tofuEdition
                if (semver.lt(localVersion, latestVersion)) {
                    log();
                    log('  tofu有更新', 'yellow');
                    log();
                    console.log('  latest:    ' + chalk.green(latestVersion))
                    console.log('  installed: ' + chalk.red(localVersion))
                    log()
                    log("  你可以在结束后输入tofu update来更新tofu", 'white');
                    log();
                    logBoundary('yellow');
                    log();
                }
                resolve();
            }
            done && done()
        })
    })

    // request({
    //     url: 'https://registry.npmjs.org/tofu',
    //     timeout: 10000
    // }, function (err, res, body) {
    //     if (err) {
    //         console.error(err)
    //     }

    //     let hasNew = false;
    //     if (!err && res.statusCode === 200) {
    //         var latestVersion = JSON.parse(body)['dist-tags'].latest
    //         var localVersion = tofuEdition
    //         if (semver.lt(localVersion, latestVersion)) {
    //             hasNew = true;
    //             console.log(chalk.yellow('  tofu有更新'))
    //             console.log()
    //             console.log('  latest:    ' + chalk.green(latestVersion))
    //             console.log('  installed: ' + chalk.red(localVersion))
    //             console.log()
    //         }
    //     }
    
    //     if (hasNew) {
    //         let immediateUpdate = inquirer.prompt({
    //             name: 'immediateUpdate',
    //             message: `需要现在更新吗`,
    //             type: 'confirm'
    //         }).then(res => {
    //             if (res.immediateUpdate) {
    //                 updateTofu();
    //             } else {
    //                 cp.execSync('npm run dev');
    //             }
    //         })
    //     }
    // })
}