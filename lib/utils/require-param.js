var cli = require('cli')

module.exports = function requireParam (params, names) {
  if (typeof names === 'string') {
    names = [names]
  }

  names.forEach(function (name) {
    if (!params[name]) {
      cli.fatal(name + ' is required.')
    }
  })
}
