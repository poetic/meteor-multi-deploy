var shell = require("shelljs")
var cli = require('cli')

/**
 * @param platform
 *   platformName
 *   projectName
 *   settingsFilePath
 */
module.exports = function (platform) {
  // set environment variable
  if (platform.settingsFilePath) {
    runCmd("modulus env set METEOR_SETTINGS \"$(cat " + platform.settingsFilePath + " | tr -d '\\n')\" -p " + platform.projectName)
  } else {
    cli.info('WARNING: you may need to specify settingsFilePath.')
  }

  runCmd('modulus deploy -p ' + platform.projectName)
  runCmd('modulus project restart -p ' + platform.projectName)
}

function runCmd (cmd) {
  cli.info(cmd)
  shell.exec(cmd)
}
