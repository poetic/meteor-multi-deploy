var cli = require('cli')
var exec = require('../utils/exec')
var warn = require('../utils/warn')
var requireParam = require('../utils/require-param')

/**
 * @param platform
 *   projectName
 *   server
 *   (OPTIONAL) mobileSettingsFilePath
 */
module.exports = function (platform) {
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
