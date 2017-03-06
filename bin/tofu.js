#! /usr/bin/env node
var program = require('commander');

program.version(require('../package').version)
      .usage('<command> [options]')
      .command('init', 'generate a new project')
      .command('update', 'update framework')
      .parse(process.argv);


