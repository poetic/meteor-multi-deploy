#! /usr/bin/env node

const program = require('commander');
const { exec, rm, test } = require('../lib/shell');
const parseOptions = require('../lib/parse-options');
const formatOption = require('../lib/format-option');

program
  .arguments('<environment>')
  .action((environment) => {
    const { name, settingsPath, server } = parseOptions('ios', environment);

    // for local development
    if (environment === 'develop') {
      const developOptionsString = [
        formatOption('--settings', settingsPath),
        formatOption('--mobile-server', server),
      ].join('');
      exec(`meteor run ios-device ${developOptionsString}`);
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

    // open project
    exec(`open ../output/ios/project/${name}.xcodeproj`);
  });

program.parse(process.argv);
