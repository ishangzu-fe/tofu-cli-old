const path = require('path');
const cwd = process.cwd();

exports.resolveCwd = (pathName) => {
    return path.resolve(cwd, pathName);
}