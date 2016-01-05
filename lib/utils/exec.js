var shell = require("shelljs")
var cli = require('cli')

module.exports = function exec (cmd) {
  cli.info(cmd)
  shell.exec(cmd)
}
