#! /usr/bin/env node

const program = require('commander');
const { exec, rm, test } = require('../lib/shell');
const parseOptions = require('../lib/parse-options');
const formatOption = require('../lib/format-option');

program
  .arguments('<environment>')
  .action((environment) => {
    // remove previous build folder
    rm('-rf', '../output/');

    // build
    const { name, settingsPath, server } = parseOptions('ios', environment);
    const serverOption = formatOption('--server', server);
    const settingsOption = formatOption('--mobile-settings', settingsPath);
    if (!test('-f', settingsPath)) {
      throw new Error(`${settingsPath} does not exist.`);
    }
    exec(`meteor build ../output ${serverOption} ${settingsOption}`);

    // open project
    exec(`open ../output/ios/project/${name}.xcodeproj`);
  });

program.parse(process.argv);
