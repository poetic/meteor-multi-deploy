var cli = require('cli');

module.exports = function requireParam(params, names, namePrefix) {
  if (typeof names === 'string') {
    names = [names];
  }

  names.forEach(function (name) {
    if (!params[name]) {
      var namePrefixWithDot = namePrefix ? namePrefix + '.' : '';
      cli.fatal(namePrefixWithDot + name + ' is required.');
    }
  });
};
