var exec = require('../utils/exec')
var warn = require('../utils/warn')
var cli  = require('cli')

/**
 * @param platform
 *   platformName
 *   projectName
 *   settingsFilePath
 */
module.exports = function (platform) {
  if (!platform.projectName) {
    cli.fatal('projectName is required.')
  }

  if (!platform.settingsFilePath) {
    cli.fatal('settingsFilePath is required.')
  }

  // set environment variable
  if (platform.settingsFilePath) {
    exec("modulus env set METEOR_SETTINGS \"$(cat " + platform.settingsFilePath + " | tr -d '\\n')\" -p " + platform.projectName)
  } else {
    warn('you may need to specify settingsFilePath.')
  }

  exec('modulus deploy -p ' + platform.projectName)
  exec('modulus project restart -p ' + platform.projectName)
}
