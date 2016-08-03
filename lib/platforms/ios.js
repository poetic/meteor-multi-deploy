var cli = require('cli');
var exec = require('../utils/exec');
var warn = require('../utils/warn');
var requireParam = require('../utils/require-param');
var deviceDevelopment = require('../utils/device-development');

/**
 * @param platform
 *   server
 *   (OPTIONAL) mobileSettingsFilePath
 */
module.exports = function (platform) {
  if (platform.environment === 'development') {
    deviceDevelopment(platform);
    return;
  }

  requireParam(platform, [
    'projectName',
    'server',
  ]);

  exec('rm -rf .meteor-builds/');

  var mobileSettingsOption = platform.mobileSettingsFilePath
    ? ' --mobile-settings ' + platform.mobileSettingsFilePath
    : '';

  exec(
    'meteor build .meteor-builds' +
    ' --server ' + platform.server +
    mobileSettingsOption
  );

  var xcodeprojPath = '.meteor-builds/ios/project/' + platform.projectName + '.xcodeproj';

  cli.ok('xcode project is created at' + xcodeprojPath);

  exec('open ' + xcodeprojPath.replace(/ /g, '\\ '));
};
