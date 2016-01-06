# The Goal
Automate the deployment of a meteor project to multiple platforms.

# Note
This is package is only tested on Mac.

# Get Started
```
npm install -g meteor-multi-deploy
alias mmd="meteor-multi-deploy"
```

After creating a meteor-multi-deploy.json under your meteor directory,
you can use ***meteor-multi-deploy(mmd)*** to deploy to multiple platforms.
```
mmd # deploy to all platforms specified in the json file
mmd android # only deploy to android
```

An example of meteor-multi-deploy.json
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
      "apkOutputPath":          "~/Downloads/my-project.apk",
      "keystoreFilePath":       ".keystore"
    }
  ]
}
```

# meteor-multi-deploy.json
- platforms

  platforms is an array of objects
  - platformName
  - (OPTIONAL) ignore
    You can ignore the current platform when trying to deploy

# Platforms

## modulus

### parameters
- platformName
- projectName
- (OPTIONAL) settingsFilePath

## ios

### parameters

## android
- projectName
- server
- (OPTIONAL) mobileSettingsFilePath

### parameters
- platformName
- projectName
- server
- storepass
- keystoreFilePath
- (OPTIONAL) apkOutputPath (DEFAULT: .meteor-builds/${projectName}.apk)
- (OPTIONAL) mobileSettingsFilePath

### extra steps
Publish your apk file at https://play.google.com/apps/publish

# TODO
- android build tool should not be hard coded
- accept params to specify which platforms to build
- use gulp or other build tools
