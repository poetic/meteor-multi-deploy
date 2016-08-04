#! /usr/bin/env node

const program = require('commander');
const mmdSetup = require('../lib/mmd-setup/index');

// API
const currentDirName = process.cwd().split('/').pop();
let name = currentDirName;

program
  .arguments('[name]')
  .option('-f, --force', 'Replace current json file.')
  .action(projectName => { name = projectName; });

program.on('--help', () => {
  console.log('Create meteor-multi-deploy.json file.');
});

program.parse(process.argv);

mmdSetup(name, program.force);
