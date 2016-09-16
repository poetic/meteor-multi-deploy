#! /usr/bin/env node

const program = require('commander');
const { exec, rm, test } = require('../lib/shell');
const parseOptions = require('../lib/parse-options');
const formatOption = require('../lib/format-option');
const fs = require('fs');
const semver = require('semver');

function getReleaseApkPath() {
  const belowOnePointFour = '../output/android/project/build/outputs/apk/' +
    'android-armv7-release-unsigned.apk';
  if (test('-f', belowOnePointFour)) {
    return belowOnePointFour;
  }

  const aboveOnePointFour = '../output/android/release-unsigned.apk';
  if (test('-f', aboveOnePointFour)) {
    return aboveOnePointFour;
  }

  throw new Error(`\
    Problem: Can not find apk file.
    Possible Causes:
    1. Meteor bug for version (1.3.x)
       https://github.com/meteor/meteor/issues/6756.
    2. Meteor is updated and the apk location is changed.
       Please update mmd if this happens. Thank you!`
  );
}

program
  .arguments('<environment>')
  .action((environment) => {
    const {
      name,
      settingsPath,
      server,
      storepass,
      keystorePath,
      apkOutputPath,
    } = parseOptions('android', environment);

    // for local development
    if (environment === 'develop') {
      const developOptionsString = [
        formatOption('--settings', settingsPath),
        formatOption('--mobile-server', server),
      ].join('');
      exec(`meteor run android-device ${developOptionsString}`);
      return;
    }

    // remove previous build folder
    rm('-rf', '../output/');

    // build
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
