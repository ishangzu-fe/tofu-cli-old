const exists = require('fs').existsSync;
const resolveCwd = require('./utils').resolveCwd;

module.exports = () => {
    if (exists(resolveCwd('node_modules'))) {
        return true;
    } else {
        return false;
    }
}