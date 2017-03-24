const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const archiver = require('archiver');

const output = fs.createWriteStream(path.resolve(__dirname, '..', 'dist.zip'));
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
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');

        // 将压缩好的zip文件移动到指定的路径
        zipPath = to || zipPath;
        if (zipPath) {
            cp.exec('mv dist.zip ' + path.relative(path.resolve(__dirname, '..'), zipPath), (err) => {
                if (err) console.error(err)
                else {
                    console.log('请在' + zipPath + '查看zip文件')
                }
            })
        }
    });

    archive.directory('./dist');
    archive.finalize();
}