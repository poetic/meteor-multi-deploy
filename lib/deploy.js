var cli = require('cli')
var requireParam = require('./utils/require-param')
var getFileNamesInDir = require('./utils/get-file-names-in-dir')

// require all platform names inside /platforms
var platformNames = getFileNamesInDir(__dirname + '/platforms')
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

  requireParam(platform, 'platformName')

  var deployForPlatform = platforms[platform.platformName]
  if (!deployForPlatform) {
    cli.fatal('Platform ' + platform.platformName + ' is not supported.')
  }

  cli.ok('---------- DEPLOYING TO PLATFORM: ' + platform.platformName)
  deployForPlatform(platform)
}

module.exports = deploy
