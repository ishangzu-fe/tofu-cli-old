require('../check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const log = require('../../lib/log').log;
const config = require('./config');
const webpackConfig = require('./webpack.prod');
const zipPath = config.zipPath;
const compress = require('../lib/compress');

module.exports = (zip, to) => {
    var spinner = ora('building for production...')
    spinner.start()

    rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
        if (err) throw err

        webpack(webpackConfig, function (err, stats) {
            spinner.stop()
            if (err) throw err
            
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')

            log('  Build complete.', 'cyan');
        })

        // if (zip || to) {
        //     compress(zipPath, to);
        // }
    })
}