var cli = require('cli')
var exec = require('../utils/exec')
var warn = require('../utils/warn')
var requireParam = require('../utils/require-param')

/**
 * @param platform
 *   server
 *   (OPTIONAL) mobileSettingsFilePath
 */
module.exports = function (platform) {

  if (platform.environment === 'development') {
    var settingsOption = platform.mobileSettingsFilePath ?
      ' --settings ' + platform.mobileSettingsFilePath:
      ''
    exec('meteor run ios-device' + settingsOption)
    return
  }

  requireParam(platform, [
    'projectName',
    'server',
  ])

  exec('rm -rf .meteor-builds/')

  exec(
    'meteor build .meteor-builds' +
    ' --server ' + platform.server +
    ' --mobile-settings ' + platform.mobileSettingsFilePath
  )

  var xcodeprojPath = '.meteor-builds/ios/project/' + platform.projectName + '.xcodeproj'

  cli.ok('xcode project is created at' + xcodeprojPath)

  exec('open ' + xcodeprojPath.replace(/ /g, '\\ '))
}
