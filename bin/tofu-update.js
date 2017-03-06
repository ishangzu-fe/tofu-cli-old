#! /usr/bin/env node

var exec = require('child_process').exec;

var child = exec('npm run build');

child.stdout.on('data',function(data){
	console.log(data);
});

console.log('update');
