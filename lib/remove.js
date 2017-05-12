const rm = require('rimraf')

module.exports = (src) => {
    return new Promise((resolve, reject) => {
        rm(src, err => {
            if (err) throw err
            resolve()
        })
    })
}