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

  // mogodump
  if (platform.mongodump) {
    var mongodump = platform.mongodump

    requireParam(
      mongodump,
      ['hostname', 'username', 'password', 'databaseName', 'dbOutputPath'],
      'mongodump'
    )

    exec(
      'mongodump' +
      ' -h ' + mongodump.hostname +
      ' -u ' + mongodump.username +
      ' -p ' + mongodump.password +
      ' --db ' + mongodump.databaseName +
      ' --out ' + mongodump.dbOutputPath
    )
  }

  // set environment variable
  if (platform.settingsFilePath) {
    exec(
      'modulus env set' +
      ' METEOR_SETTINGS "$(cat' + platform.settingsFilePath + ' | tr -d \'\\n\')"' +
      ' -p ' + platform.projectName
    )
  } else {
    warn('you may need to specify settingsFilePath.')
  }

  exec('modulus deploy -p ' + platform.projectName)
  exec('modulus project restart -p ' + platform.projectName)
}
