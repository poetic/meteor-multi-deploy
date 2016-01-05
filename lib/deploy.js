var cli = require('cli')

var platforms = ['modulus'].reduce(function (acc, platformName) {
  acc[platformName] = require('./platforms/' + platformName)
  return acc
}, {})

var deploy = function (platform) {
  if (platform.ignore) {
    return
  }

  if (!platform.platformName) {
    cli.fatal('platformName is required.')
  }

  platforms[platform.platformName](platform)
}

module.exports = deploy
