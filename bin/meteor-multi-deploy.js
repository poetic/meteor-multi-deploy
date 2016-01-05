#! /usr/bin/env node
var fs    = require('fs')
var cli   = require('cli')

// check if deploy.json exist
var meteorDir      = process.cwd()
var deployFilePath = meteorDir + '/deploy.json'

try {
  fs.accessSync(deployFilePath, fs.F_OK)
} catch (e) {
  cli.error('deploy.json is not found under current directory.')
  process.exit(1)
}

// parse deploy.json
try {
  var deployDescription = JSON.parse(fs.readFileSync(deployFilePath))
} catch (e) {
  cli.error('deploy.json is not a valid json file:')
  cli.error(e)
  process.exit(e)
}

// deploy to all platforms
var deploy = require('../lib/deploy.js')

deployDescription.platforms.forEach(deploy)
