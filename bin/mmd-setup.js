#! /usr/bin/env node
/* eslint-disable  no-console */

const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shell = require('../lib/shell');

// do not show test command from shelljs
shell.config.verbose = false;
const { test } = shell;

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

// Implementation
function generateConfigJson(projectName) {
  const fileName = 'meteor-multi-deploy.json';
  const filePath = path.resolve(fileName);
  const fileContent = `\
{
  "default": {
    "default": {
      "name": "${projectName}",
      "settingsPath": "settings.json"
    },
    "production": {
      "server": "${projectName}.herokuapp.com",
      "settingsPath": "settings.production.json"
    },
    "staging": {
      "server": "${projectName}-staging.herokuapp.com",
      "settingsPath": "settings.staging.json"
    }
  },
  "android": {
    "default": {
      "storepass": "<storepass>",
      "keystorePath": ".keystore",
      "apkOutputPath": "~/Downloads/${projectName}.apk"
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
}


// check if meteor-multi-deploy.json already exist
const jsonExist = test('-f', path.resolve('meteor-multi-deploy.json'));
if (jsonExist && !program.force) {
  console.log(chalk.red(
    'WARNING: meteor-multi-deploy.json already exist, use -f to force update.'
  ));
} else {
  generateConfigJson(name);
}

// android
// android-keystore
const keystoreExist = test('-f', path.resolve('.keystore'));
if (!keystoreExist) {
  const keystoreOptionsString = [
    '-genkey',
    `-alias ${name}`,
    '-keyalg RSA',
    '-keysize 2048',
    '-validity 10000',
    '-dname "CN=Matthew Hager, OU=Poeticsystems, O=Poeticsystems, L=Houston, ST=Texas, C=US"',
  ].join(' ');
  const keystoreCommand = chalk.green(`keytool ${keystoreOptionsString}`);
  const helpForKeystore = `
${chalk.red('WARNING: Andoird keystore file')}
It seems you do not have a keystore file for android.
If you have one, please rename it to '.keystore'.
Otherwise, you can:
1. run the following command to generate .keystore at ~/.keystore.
${keystoreCommand}
2. move the .keystore file in your local directory.
${chalk.green('mv ~/.keystore ./')}
3. replace "<storepass>" in meteor-multi-deploy.json with the correct one.
`;
  console.log(helpForKeystore);
}
