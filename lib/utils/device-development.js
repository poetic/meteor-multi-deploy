var exec = require('./exec');

module.exports = function (platform) {
  var deviceType = platform.platformName + '-device';

  var settingsOption = platform.mobileSettingsFilePath ?
    ' --settings ' + platform.mobileSettingsFilePath :
    '';

  var serverOption = platform.server ?
    ' --mobile-server ' + platform.server :
    '';

  exec('meteor run ' + deviceType + settingsOption + serverOption);
};
