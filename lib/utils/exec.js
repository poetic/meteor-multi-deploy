var shell = require('shelljs');
var cli = require('cli');

module.exports = function exec(cmd, options) {
  cli.info(cmd);

  var result = shell.exec(cmd, options);
  if (result.code !== 0) {
    cli.fatal('Please check the errors.');
  }
};
