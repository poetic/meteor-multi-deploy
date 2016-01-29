var exec = require('../utils/exec')
var warn = require('../utils/warn')
var requireParam = require('../utils/require-param')

/**
 * @param platform
 *   platformName
 *   projectName
 *   settingsFilePath
 */
module.exports = function (platform) {
  requireParam(platform, ['projectName'])

  // set environment variable
  if (platform.settingsFilePath) {
    exec("modulus env set METEOR_SETTINGS \"$(cat " + platform.settingsFilePath + " | tr -d '\\n')\" -p " + platform.projectName)
  } else {
    warn('you may need to specify settingsFilePath.')
  }

  exec('modulus deploy -p ' + platform.projectName)
  exec('modulus project restart -p ' + platform.projectName)
}
