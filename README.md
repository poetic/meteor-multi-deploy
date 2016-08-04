# The Goal
Automate the deployment of a meteor project to multiple platforms.

# Requirements
node >= 6.0.0

# Get Started
```
npm install -g meteor-multi-deploy
cd path/to/my-project
mmd setup
mmd android production
mmd ios production
mmd heroku production

mmd # print help info
```

# meteor-multi-deploy.json
After you run `mmd setup`, a meteor-multi-deploy.json file will be generated.
Let's call the json object `config`.

When you run `mmd <platform> <environment>`, mmd will combine default config and
specific config for the platform and environment. The priority is in this order:

- config.<platform>.<environment>
- config.<platform>.default
- config.default.<environment>
- config.default.default
