const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { test } = require('../shell');

function generateMobileConfig(name) {
  const fileName = 'mobile-config.js';
  const filePath = path.resolve(fileName);
  const cleanName = name.replace(/[-_]/g, '');

  if (name !== cleanName) {
    console.log(chalk.red(
      'WARN: App id can not contain "-" for Andoird, ' +
      `we use ${cleanName} instead of ${name} in the id.`
    ));
  }

  const fileContent = `
App.info({
  id: 'com.poeticsystems.${cleanName}',
  name: '${name}',
  author: 'Poetic Systems',
  email: 'contact@poeticsystems.com',
  website: 'poeticsystems.com',
  version: '1.0.0',
});

// SIZE: http://docs.meteor.com/api/mobile-config.html#App-icons
App.icons({
  'iphone_2x': 'resources/icons/iphone_2x.png',
  'iphone_3x': 'resources/icons/iphone_3x.png',
  'ipad': 'resources/icons/ipad.png',
  'ipad_2x': 'resources/icons/ipad_2x.png',
  'ipad_pro': 'resources/icons/ipad_pro.png',
  'ios_settings': 'resources/icons/ios_settings.png',
  'ios_settings_2x': 'resources/icons/ios_settings_2x.png',
  'ios_settings_3x': 'resources/icons/ios_settings_3x.png',
  'ios_spotlight': 'resources/icons/ios_spotlight.png',
  'ios_spotlight_2x': 'resources/icons/ios_spotlight_2x.png',

  'android_mdpi': 'resources/icons/android_mdpi.png',
  'android_hdpi': 'resources/icons/android_hdpi.png',
  'android_xhdpi': 'resources/icons/android_xhdpi.png',
  'android_xxhdpi': 'resources/icons/android_xxhdpi.png',
  'android_xxxhdpi': 'resources/icons/android_xxxhdpi.png',
});

// SIZE: http://docs.meteor.com/api/mobile-config.html#App-launchScreens
App.launchScreens({
  'iphone_2x': 'resources/launch-screens/iphone_2x.png',
  'iphone5': 'resources/launch-screens/iphone5.png',
  'iphone6': 'resources/launch-screens/iphone6.png',
  'iphone6p_portrait': 'resources/launch-screens/iphone6p_portrait.png',
  'iphone6p_landscape': 'resources/launch-screens/iphone6p_landscape.png',
  'ipad_portrait': 'resources/launch-screens/ipad_portrait.png',
  'ipad_portrait_2x': 'resources/launch-screens/ipad_portrait_2x.png',
  'ipad_landscape': 'resources/launch-screens/ipad_landscape.png',
  'ipad_landscape_2x': 'resources/launch-screens/ipad_landscape_2x.png',

  'android_mdpi_portrait': 'resources/launch-screens/android_mdpi_portrait.png',
  'android_hdpi_portrait': 'resources/launch-screens/android_hdpi_portrait.png',
  'android_xhdpi_portrait': 'resources/launch-screens/android_xhdpi_portrait.png',
  'android_xxhdpi_portrait': 'resources/launch-screens/android_xxhdpi_portrait.png',
});

// App.setPreference('Orientation', 'portrait');

App.accessRule('*');
App.accessRule('content://*');
App.accessRule('http://*');
App.accessRule('https://*');
App.accessRule('blob:*');
`;
  fs.writeFileSync(filePath, fileContent);
  console.log(chalk.green(`${fileName} is generated for ${name}.`));
}

module.exports = function ensureMobileConfigExist(name, force) {
  const mobileConfigExist = test('-f', path.resolve('mobile-config.js'));
  if (mobileConfigExist && !force) {
    console.log(chalk.red(
      'WARNING: mobile-config.js already exist, use -f to force update.'
    ));
  } else {
    generateMobileConfig(name);
  }
};
