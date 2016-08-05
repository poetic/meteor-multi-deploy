#! /usr/bin/env node

const program = require('commander');
const { version, description } = require('../package.json');

program.version(version).description(description);

program.command('setup [name]', 'Create meteor-multi-deploy.json file.').alias('s');
program.command('android <environment>', 'Create android apk.').alias('a');
program.command('ios <environment>', 'Build and open the project in Xcode').alias('i');
program.command('heroku <environment>', 'Push to heroku').alias('h');

program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ mmd setup');
  console.log('    $ mmd android production');
  console.log('');
});

program.parse(process.argv);
