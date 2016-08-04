# meteor-multi-deploy
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

[travis-image]:            https://travis-ci.org/poetic/meteor-multi-deploy.svg
[travis-url]:              https://travis-ci.org/poetic/meteor-multi-deploy
[npm-image]:               https://img.shields.io/npm/v/poetic-meteor-multi-deploy.svg
[npm-url]:                 https://npmjs.org/package/poetic-meteor-multi-deploy
[semantic-release-image]:  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:    https://github.com/semantic-release/semantic-release

## The Goal
Automate the deployment of a meteor project to multiple platforms.

## Requirements
node >= 6.0.0

## Get Started
```
npm install -g meteor-multi-deploy
cd path/to/my-project
mmd setup
mmd android production
mmd ios production
mmd heroku production

mmd # print help info
```

## meteor-multi-deploy.json
After you run `mmd setup`, a meteor-multi-deploy.json file will be generated.
Let's call the json object `config`.

When you run `mmd <platform> <environment>`, mmd will combine default config and
specific config for the platform and environment. The priority is in this order:

- config.\<platform\>.\<environment\>
- config.\<platform\>.default
- config.default.\<environment\>
- config.default.default
