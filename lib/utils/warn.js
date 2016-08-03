var cli = require('cli');

module.exports = function (warning) {
  cli.info('WARNING: ' + warning);
};
