const fs = require('fs')
const rm = require('rimraf')
const path = require('path')

let msgArr = []

const copyFile = (src, dist) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dist)) {
            try {
                fs.writeFileSync(dist, '')
            } catch (err) {
                if (err) throw err
            }
        }

        const rs = fs.createReadStream(src)
        rs.on('error', err => {
            if (err) throw err
        })
        const ws = fs.createWriteStream(dist)
        ws.on('error', err => {
            if (err) throw err
        })
        ws.on('close', () => {
            msgArr.push(src)
            resolve()
        });
        rs.pipe(ws)
    })
}

const rmAndMkdir = (dist) => {
    return new Promise((resolve, reject) => {
        rm(dist, err => {
            if (err) throw err

            try {
                fs.mkdirSync(dist)
            } catch (err) {
                if (err) throw err
            }
            resolve()
        })
    })
}

const checkFile = async (src, dist) => {
    let stats 
    try {
        stats = fs.statSync(src)
    } catch (err) {
        if (err) throw err
    }
    let type = stats.isDirectory() ? 'directory' : (stats.isFile() ? 'file' : 'error')
    if (type === 'error') {
        throw new Error('不明文件类型')
    }

    if (type === 'file') {
        await copyFile(src, dist)
    } else {
        await rmAndMkdir(dist)
        let files
        try {
            files = fs.readdirSync(src)
        } catch (err) {
            if (err) throw err
        }
        files.forEach(file => {
            let srcFile = path.posix.join(src, file)
            let distFile = path.posix.join(dist, file)
            checkFile(srcFile, distFile)
        })
    }

    return Promise.resolve(msgArr)
}

module.exports = checkFile