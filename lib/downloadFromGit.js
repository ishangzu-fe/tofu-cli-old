const download = require('download-git-repo')

module.exports = (src, dist, clone) => {
    return new Promise((resolve, reject) => {
        download(src, dist, { clone }, err => {
            if (err) throw err
            resolve()
        })
    })
}