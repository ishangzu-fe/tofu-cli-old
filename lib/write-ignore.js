const fs = require('fs');
const path = require('path');
// const log = require('./log').log;

module.exports = (pathName) => {
    const ignoreFile = path.posix.join(pathName, '.gitignore');
    fs.writeFile(ignoreFile, 'node_modules/\nconfig.js', (err) => {
        if (err) throw err;
        
        // log(`改写${ignoreFile}成功` , 'green');
    });
}