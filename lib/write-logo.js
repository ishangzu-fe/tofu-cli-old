const fs = require('fs');
const path = require('path');

module.exports = (pathName, logo) => {
    const configFile = path.posix.join(pathName, 'config.js');

    let data = fs.readFileSync(configFile);
    data = data.toString().replace(/\%logo\%/, logo);

    fs.writeFile(configFile, data, (err) => {
        if (err) throw err;
    });
}