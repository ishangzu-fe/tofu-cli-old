const chalk = require('chalk');

exports.log = (msg, color) => {
    msg = msg || '';
    color = color || 'white';
    console.log(chalk[color](msg));
}

exports.logBoundary = (color) => {
    color = color || 'green';
    console.log(chalk[color]('----------------------------------------------'));
}

exports.logFail = (msg, prefix) => {
    msg = msg || '';
    prefix = prefix || '';

    if (msg instanceof Error) {
		msg = msg.message.trim();
	}

    console.log(chalk.red(`${prefix}×  ${msg}`));
}

exports.logSuccess = (msg, prefix) => {
    msg = msg || '';
    prefix = prefix || '';

    console.log(chalk.green(`${prefix}✔  ${msg}`));
}

/**
 * 多条消息单行打印
 * 
 * @param {Array} msgs 消息对象数组，格式见log方法
 */
exports.logLine = (msgs) => {
    if (!msgs instanceof Array) 
        throw Error('Messages must be instance of Array');
    if (!msgs.length) return;

    let msg = '';
    msgs.forEach(m => {
        let message = m.message || '';
        let color = m.color || 'white';

        msg += chalk[color](message);
    })
    console.log(msg);
}
