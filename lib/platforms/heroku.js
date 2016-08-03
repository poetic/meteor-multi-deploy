var cli = require('cli');
var exec = require('../utils/exec');
var warn = require('../utils/warn');
var requireParam = require('../utils/require-param');

module.exports = function (platform) {
  requireParam(platform, ['projectName']);

  var projectName = platform.projectName;
  var environment = platform.environment;

  exec(`git remote add ${environment} https://git.heroku.com/${projectName}.git &> /dev/null || true`);

  if (platform.settingsFilePath) {
    exec(`heroku config:set METEOR_SETTINGS="$(cat ${platform.settingsFilePath})`);
  }

  exec(`git push ${environment}`);
};
