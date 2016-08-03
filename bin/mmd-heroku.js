#! /usr/bin/env node

const program = require('commander');
const { exec } = require('../lib/shell');
const parseOptions = require('../lib/parse-options');

program
  .arguments('<environment>')
  .action((environment) => {
    const { name, settingsPath } = parseOptions('heroku', environment);

    exec(`git remote add ${environment} https://git.heroku.com/${name}.git &> /dev/null || true`);

    if (settingsPath) {
      exec(`heroku config:set METEOR_SETTINGS="$(cat ${settingsPath})`);
    }

    exec(`git push ${environment}`);
  });

program.parse(process.argv);
