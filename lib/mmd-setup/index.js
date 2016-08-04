// do not show test command from shelljs
const shell = require('../shell');
shell.config.verbose = false;

const ensureMmdJsonExist = require('./ensure-mmd-json-exist');
const ensureMobileConfigExist = require('./ensure-mobile-config-exist');
const ensureAndroidKeystoreExist = require('./ensure-android-keystore-exist');

module.exports = function index(name, force) {
  ensureMmdJsonExist(name, force);
  ensureMobileConfigExist(name, force);
  ensureAndroidKeystoreExist(name);
};
