const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { test } = require('../shell');

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

module.exports = function ensureConfigJsonExist(name, force) {
  const jsonExist = test('-f', path.resolve('meteor-multi-deploy.json'));
  if (jsonExist && !force) {
    console.log(chalk.red(
      'WARNING: meteor-multi-deploy.json already exist, use -f to force update.'
    ));
  } else {
    generateConfigJson(name);
  }
};
