// do not show test command from shelljs
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shell = require('../shell');

shell.config.verbose = false;
const { test } = shell;

// Implementation
function generateConfigJson(name) {
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
      "keystorePath": ".keystore",
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
}

function ensureConfigJsonExist(name, force) {
  const jsonExist = test('-f', path.resolve('meteor-multi-deploy.json'));
  if (jsonExist && !force) {
    console.log(chalk.red(
      'WARNING: meteor-multi-deploy.json already exist, use -f to force update.'
    ));
  } else {
    generateConfigJson(name);
  }
}

function ensureAndroidKeystoreExist(name) {
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
}

module.exports = function index(name, force) {
  // check if meteor-multi-deploy.json already exist
  ensureConfigJsonExist(name, force);

  // android
  ensureAndroidKeystoreExist(name);
};
