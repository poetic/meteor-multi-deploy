#! /usr/bin/env node
var fs = require('fs');
var cli = require('cli');

var mmdFileName = 'meteor-multi-deploy.json';

// check if json exist
var meteorDir = process.cwd();
var deployFilePath = meteorDir + '/' + mmdFileName;

try {
  fs.accessSync(deployFilePath, fs.F_OK);
} catch (e) {
  cli.error(mmdFileName + ' is not found under current directory.');
  process.exit(1);
}

// parse json
try {
  var deployDescription = JSON.parse(fs.readFileSync(deployFilePath));
} catch (e) {
  cli.error(mmdFileName + ' is not a valid json file:');
  cli.error(e);
  process.exit(e);
}

// deploy to all platforms
var deploy = require('../lib/deploy.js');

// enable user to specify a platform name when running mmd
var platforms = deployDescription.platforms;

var platformName = process.argv[2];
var environment = process.argv[3];

if (platformName) {
  platforms = platforms.filter(function (platform) {
    return platform.platformName === platformName &&
      (!environment || platform.environment === environment);
  });
}

platforms.forEach(deploy);
