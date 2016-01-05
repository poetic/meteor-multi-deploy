# The Goal
Automate the deployment of a meteor project to multiple platforms.

# Get Started
```
npm install -g meteor-multi-deploy
alias mmd="meteor-multi-deploy"
```

After creating a deploy.json under your meteor directory,
you can use ***meteor-multi-deploy(mmd)*** to deploy to multiple platforms.

An example of deploy.json
```json
{
  "platforms": [
    {
      "platformName":     "modulus",
      "projectName":      "modulus-project-name",
      "settingsFilePath": "settings.production.json"
    }
  ]
}
```

# Platforms

## modulus
- "platformName": "modulus"
- "projectName": "modulus-project-name"
- (OPTIONAL)"settingsFilePath": "settings.production.json"

## ios
## android
