const path = require('path');
const chalk = require('chalk');
const { test } = require('../shell');

module.exports = function ensureAndroidKeystoreExist(name) {
  const keystoreExist = test('-f', path.resolve('.keystore'));

  if (!keystoreExist) {
    const keystoreOptionsString = [
      '-genkey',
      `-alias ${name}`,
      '-keyalg RSA',
      '-keysize 2048',
      '-validity 10000',
      '-dname "CN=Matthew Hager, OU=Poeticsystems, O=Poeticsystems, L=Houston, ST=Texas, C=US"',
    ].join(' ');
    const keystoreCommand = chalk.green(`keytool ${keystoreOptionsString}`);
    const helpForKeystore = `
${chalk.red('WARNING: Andoird keystore file')}
It seems you do not have a keystore file for android.
If you have one, please rename it to '.keystore'.
Otherwise, you can:
1. run the following command to generate .keystore at ~/.keystore.
    ${keystoreCommand}
2. move the .keystore file in your local directory.
    ${chalk.green('mv ~/.keystore ./')}
3. replace "<storepass>" in meteor-multi-deploy.json with the correct one.
`;
    console.log(helpForKeystore);
  }
};
