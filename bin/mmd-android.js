#! /usr/bin/env node

const program = require('commander');
const { exec, rm, test } = require('../lib/shell');
const parseOptions = require('../lib/parse-options');
const formatOption = require('../lib/format-option');
const fs = require('fs');
const semver = require('semver');

function getReleaseApkPath() {
  const vBelow1_4 = '../output/android/project/build/outputs/apk/' +
    'android-armv7-release-unsigned.apk';
  if (test('-f', vBelow1_4)) {
    return vBelow1_4;
  }

  const vAbove1_4 = '../output/android/release-unsigned.apk';
  if (test('-f', vAbove1_4)) {
    return vAbove1_4
  }

  throw new Error(
    'Can not find apk file, ' +
    'maybe meteor is updated and the apk location is changed.'
  )
}

program
  .arguments('<environment>')
  .action((environment) => {
    // remove previous build folder
    rm('-rf', '../output/');

    // build
    const {
      name,
      settingsPath,
      server,
      storepass,
      keystorePath,
      apkOutputPath,
    } = parseOptions('android', environment);

    const serverOption = formatOption('--server', server);
    const settingsOption = formatOption('--mobile-settings', settingsPath);
    if (settingsPath && !test('-f', settingsPath)) {
      throw new Error(`${settingsPath} does not exist.`);
    }
    exec(`meteor build ../output ${serverOption} ${settingsOption}`);

    // sign
    const releaseApkPath = getReleaseApkPath();
    const jarsignerOptions = [
      '-verbose',
      '-sigalg SHA1withRSA',
      '-digestalg SHA1',
      `-storepass ${storepass}`,
      `-keystore ${keystorePath}`,
    ];
    exec(`jarsigner ${jarsignerOptions.join(' ')} ${releaseApkPath} ${name}`);

    const apkOutputPathDefault = `../output/${name}.apk`;
    const outputPath = apkOutputPath || apkOutputPathDefault;

    // make sure $ANDROID_HOME is defnied
    const ANDROID_HOME = process.env.ANDROID_HOME;
    if (!ANDROID_HOME) {
      throw new Error('$ANDROID_HOME is not set, please set it.');
    }

    // zip and open play store website
    const sdkVersions = fs
      .readdirSync(`${ANDROID_HOME}/build-tools`)
      .filter(fileName => fileName !== '.' && fileName !== '..');
    const latestSdkVersion = sdkVersions.sort(semver.rcompare)[0];
    const latestSdkPath = `${ANDROID_HOME}/build-tools/${latestSdkVersion}`;
    exec(`rm -f ${outputPath}`);
    exec(`${latestSdkPath}/zipalign 4 ${releaseApkPath} ${outputPath}`);

    exec('open https://play.google.com/apps/publish');
  });

program.parse(process.argv);
