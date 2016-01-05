var fs = require('fs')
var cli = require('cli')

// require all platform names inside /platforms
var platformNames = fs.readdirSync(__dirname + '/platforms')
  .filter(function (platformName) {
    return platformName !== '.' && platformName !== '..'
  })
  .map(function (platformName) {
    // remove .js extension
    return platformName.replace(/\.js$/, '')
  })

var platforms = platformNames.reduce(function (acc, platformName) {
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
