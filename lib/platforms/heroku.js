var cli = require('cli')
var exec = require('../utils/exec')
var warn = require('../utils/warn')
var requireParam = require('../utils/require-param')

module.exports = function (platform) {
  requireParam(platform, ['projectName'])

  var projectName = platform.projectName;
  var branchToPush = platform.branchToPush;
  var environment = platform.environment;
  var notMaster = false;

  if (environment !== 'production') {
    notMaster = true;

    requireParam(platform, ['branchToPush']);
    requireParam(platform, ['confirmPushToMaster']);

    if (platform.confirmPushToMaster !== 'true') {
      cli.fatal('You must confirm to push to ' + branchToPush + ' to ' + projectName + ' master branch.');
    }
  }

  if (platform.settingsFilePath) {
    console.log('yo there are settings files.');

    exec(
      'heroku config:add' +
      ' METEOR_SETTINGS="$(cat ' + platform.settingsFilePath + ' | tr -d \'\\n\')"'
    )
  } else {
    warn('you may need to specify settingsFilePath.')
  }

  var pushCommand = notMaster ? platform.branchToPush + ':master' : 'master';
  console.log('pushCommand: ', pushCommand);

  exec('git push heroku ' + pushCommand);
}
