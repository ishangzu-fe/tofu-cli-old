/**
 * 提取参数
 */
function checkArg () {
    process.argv.forEach((v, idx) => {

        if (idx >= 2 && allowedArg.indexOf(v) === -1) {
            
            cp.execSync('tofu init -h');
            process.exit(1);
        }

        switch (v) {
            case '--git':
                toggle['git'] = true;
                break;
            default:
                break;
        }
    });
}