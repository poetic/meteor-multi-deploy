var fs = require('fs')

module.exports = function getFileNamesInDir (dir) {
  return fs.readdirSync(dir)
    .filter(function (name) {
      return name !== '.' && name !== '..'
    })
}
