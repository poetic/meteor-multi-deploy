var semver = require('semver');
var cli = require('cli')
var exec = require('../utils/exec')
var warn = require('../utils/warn')
var requireParam = require('../utils/require-param')
var getFileNamesInDir = require('../utils/get-file-names-in-dir')

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

  // make sure $ANDROID_HOME is defnied
  var ANDROID_HOME = process.env.ANDROID_HOME
  if (!ANDROID_HOME) {
    cli.fatal('$ANDROID_HOME is not set, please set it.')
  }

  var sdkVersions = getFileNamesInDir(ANDROID_HOME + '/build-tools')
  var latestSdkVersion = sdkVersions.sort(semver.rcompare)[0]
  var latestSdkPath = ANDROID_HOME + '/build-tools/' + latestSdkVersion
  cli.info('Latest SDK version is detected at', latestSdkVersion)

  exec('rm -f ' + apkPath)

  exec(
    latestSdkPath + '/zipalign 4' +
    ' .meteor-builds/android/project/build/outputs/apk/android-armv7-release-unsigned.apk' +
    ' ' + apkPath
  )

  cli.ok('apk is created at ' + apkPath)

  exec('open https://play.google.com/apps/publish')
}
