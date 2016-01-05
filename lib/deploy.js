var platforms = ['modulus'].reduce(function (acc, platformName) {
  acc[platformName] = require('./platforms/' + platformName)
  return acc
}, {})

var deploy = function (platform) {
  if (platform.ignore) {
    return
  }

  platforms[platform.platformName](platform)
}

module.exports = deploy
