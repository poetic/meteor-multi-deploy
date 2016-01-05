var cli = require('cli')
var exec = require('../utils/exec')
var warn = require('../utils/warn')
var requireParam = require('../utils/require-param')

/**
 * @param platform
 *   projectName
 *   server
 *   (OPTIONAL) mobileSettingsFilePath
 *   storepass
 *   keystoreFilePath
 */
module.exports = function (platform) {
  requireParam(platform, [
    'projectName',
    'server',
    'storepass',
    'keystoreFilePath',
  ])

  exec('rm -rf .meteor-builds/')

  exec(
    'meteor build .meteor-builds' +
    ' --server ' + platform.server +
    ' --mobile-settings ' + platform.mobileSettingsFilePath
  )

  exec(
    'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1' +
    ' -storepass ' + platform.storepass +
    ' -keystore ' + platform.keystoreFilePath +
    ' .meteor-builds/android/project/build/outputs/apk/android-armv7-release-unsigned.apk' +
    ' ' + platform.projectName
  )

  var apkPath = platform.apkOutputPath ||
    '.meteor-builds/' + platform.projectName + '.apk'

  exec(
    '$ANDROID_HOME/build-tools/23.0.2/zipalign 4' +
    ' .meteor-builds/android/project/build/outputs/apk/android-armv7-release-unsigned.apk' +
    ' ' + apkPath
  )

  cli.ok('apk is created at ' + apkPath)

  exec('open https://play.google.com/apps/publish')
}
