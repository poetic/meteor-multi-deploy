var exec = require('../utils/exec');

/**
 * @param platform
 *   platformName
 *   projectName
 *   settingsFilePath
 *   {
 *     "platformName":     "browser",
 *     "settingsFilePath": "settings.development.json"
 *   }
 */

module.exports = function (platform) {
  exec('meteor run --settings ' + platform.settingsFilePath);
};
