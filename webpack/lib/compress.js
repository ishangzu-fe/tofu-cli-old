const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const archiver = require('archiver');
const log = require('../../lib/log').log;
const logSuccess = require('../../lib/log').logSuccess;

const output = fs.createWriteStream(path.resolve(process.cwd(), 'dist.zip'));
const archive = archiver('zip', {
    zlib: {
        level: 0 // 压缩等级 1-9
    }
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

module.exports = (zipPath, to) => {

    output.on('close', function () {
        log();
        logSuccess('已经将压缩好的文件放置在当前文件夹');

        // 将压缩好的zip文件移动到指定的路径
        zipPath = (typeof to === 'string') ? to : zipPath;
        if (zipPath) {
            cp.exec('mv dist.zip ' + path.relative(process.cwd(), zipPath), (err) => {
                if (err) throw err;
                else {
                    logSuccess('已经将压缩好的文件移动到指定位置，请在' + zipPath + '查看文件');
                }
            })
        }
    });

    archive.directory('./dist');
    archive.finalize();
}