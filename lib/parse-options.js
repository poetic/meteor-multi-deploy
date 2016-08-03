const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function parseOptions(platform, environment) {
  // merge config
  const configString = fs.readFileSync(path.resolve('meteor-multi-deploy.json'), 'utf-8');
  const config = JSON.parse(configString);
  const mergedConfig = _.assign(
    _.get(config, 'default.default'),
    _.get(config, `default.${environment}`),
    _.get(config, `${platform}.${environment}`)
  );

  // config validation
  const { name, storepass, keystorePath } = mergedConfig;

  if (!name) {
    throw new Error('name is required.');
  }

  switch (platform) {
    case 'android':
      if (!storepass) {
        throw new Error('storepass is required.');
      }
      if (!keystorePath) {
        throw new Error('keystorePath is required.');
      }
      break;

    default:
      break;
  }

  return mergedConfig;
};
