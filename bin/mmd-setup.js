#! /usr/bin/env node
/* eslint-disable  no-console */

const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

program
  .arguments('[name]')
  .action((name) => {
    const fileName = 'meteor-multi-deploy.json';
    const filePath = path.resolve(fileName);
    const fileContent = `\
{
  "default": {
    "default": {
      "name": "${name}",
      "settingsPath": "settings.json"
    },
    "production": {
      "server": "${name}.herokuapp.com",
      "settingsPath": "settings.production.json"
    },
    "staging": {
      "server": "${name}-staging.herokuapp.com",
      "settingsPath": "settings.staging.json"
    }
  },
  "android": {
    "default": {
      "storepass": "<storepass>",
      "keystorePath": "keystore",
      "apkOutputPath": "~/Downloads/${name}.apk"
    }
  },
  "ios": {
  },
  "heroku": {
  }
}
`;
    fs.writeFileSync(filePath, fileContent);
    console.log(chalk.green(`${fileName} is generated for ${name}.`));
  });

program.on('--help', () => {
  console.log('Create meteor-multi-deploy.json file.');
});

// set default name
if (process.argv.length === 2) {
  const currentDirName = process.cwd().split('/').pop();
  process.argv.push(currentDirName);
}

program.parse(process.argv);
