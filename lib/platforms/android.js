var semver = require('semver');
var cli = require('cli');
var exec = require('../utils/exec');
var warn = require('../utils/warn');
var requireParam = require('../utils/require-param');
var getFileNamesInDir = require('../utils/get-file-names-in-dir');
var deviceDevelopment = require('../utils/device-development');

/**
 * @param platform
 *   projectName
 *   server
 *   (OPTIONAL) mobileSettingsFilePath
 *   storepass
 *   keystoreFilePath
 */
module.exports = function (platform) {
  if (platform.environment === 'development') {
    deviceDevelopment(platform);
    return;
  }

  requireParam(platform, [
    'projectName',
    'server',
    'storepass',
    'keystoreFilePath',
  ]);

  exec('rm -rf .meteor-builds/');

  var meteorBuild = 'meteor build .meteor-builds';

  var serverOption = platform.server
    ? '--server ' + platform.server
    : '';

  var mobileSettingsOption = platform.mobileSettingsFilePath
    ? ' --mobile-settings ' + platform.mobileSettingsFilePath
    : '';

  exec([meteorBuild, serverOption, mobileSettingsOption].join(' '));

  exec(
    'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1' +
    ' -storepass ' + platform.storepass +
    ' -keystore ' + platform.keystoreFilePath +
    ' .meteor-builds/android/project/build/outputs/apk/android-armv7-release-unsigned.apk' +
    ' ' + platform.projectName
  );

  var apkPath = platform.apkOutputPath ||
    '.meteor-builds/' + platform.projectName + '.apk';

  // make sure $ANDROID_HOME is defnied
  var ANDROID_HOME = process.env.ANDROID_HOME;
  if (!ANDROID_HOME) {
    cli.fatal('$ANDROID_HOME is not set, please set it.');
  }

  var sdkVersions = getFileNamesInDir(ANDROID_HOME + '/build-tools');
  var latestSdkVersion = sdkVersions.sort(semver.rcompare)[0];
  var latestSdkPath = ANDROID_HOME + '/build-tools/' + latestSdkVersion;
  cli.info('Latest SDK version is detected at', latestSdkVersion);

  exec('rm -f ' + apkPath);

  exec(
    latestSdkPath + '/zipalign 4' +
    ' .meteor-builds/android/project/build/outputs/apk/android-armv7-release-unsigned.apk' +
    ' ' + apkPath
  );

  cli.ok('apk is created at ' + apkPath);

  exec('open https://play.google.com/apps/publish');
};
