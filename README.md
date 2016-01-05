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
      "projectName":      "my-production-project",
      "settingsFilePath": "settings.production.json"
    },
    {
      "platformName":     "modulus",
      "projectName":      "my-staging-project",
      "settingsFilePath": "settings.stating.json",
      "ignore": true
    },
    {
      "platformName":           "android",
      "projectName":            "my-project",
      "server":                 "my.production.server",
      "storepass":              "storepass",
      "mobileSettingsFilePath": "settings-production.json",
      "keystoreFilePath":       ".keystore"
    }
  ]
}
```

# deploy.json
- platforms
  platforms is an array of objects
  - platformName
  - (OPTIONAL) ignore
    You can ignore the current platform when trying to deploy

# Platforms

## modulus
- platformName
- projectName
- (OPTIONAL) settingsFilePath

## ios

## android
- platformName
- projectName
- server
- mobileSettingsFilePath
- storepass
- keystoreFilePath
