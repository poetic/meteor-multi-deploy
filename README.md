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
mmd android staging # only deploy to android for staging environment
```

An example of meteor-multi-deploy.json
```json
{
  "platforms": [
    {
      "platformName":     "modulus",
      "environment":      "production",
      "projectName":      "hoopla-production",
      "settingsFilePath": "settings-production.json"
    },
    {
      "platformName":     "modulus",
      "environment":      "staging",
      "projectName":      "hoopla-staging",
      "settingsFilePath": "settings-staging.json"
    },
    {
      "platformName":           "android",
      "environment":            "production",
      "projectName":            "hoopla.keystore",
      "server":                 "app.hoopla.social",
      "storepass":              "hoopla",
      "keystoreFilePath":       ".keystore",
      "mobileSettingsFilePath": "settings-production.json",
      "apkOutputPath":          "~/Downloads/hoopla.apk"
    },
    {
      "platformName":           "ios",
      "environment":            "production",
      "projectName":            "hoopla",
      "server":                 "app.hoopla.social",
      "mobileSettingsFilePath": "settings-production.json"
    },
  ]
}
```

# meteor-multi-deploy.json
- platforms

  platforms is an array of objects. Common params are listed bellow.
  Platform specific params are listed at [Platforms](#platforms).
  - platformName
  - (OPTIONAL) ignore
    (You can ignore the current platform when trying to deploy)

# Platforms<a name="platforms"></a>

## modulus

### parameters
- projectName
- (OPTIONAL) settingsFilePath
- (OPTIONAL) mongodump
  (used to create a mongodump file)

## ios

### parameters
- projectName
  (used to open your XXX.xcodeproj folder)
- server
- (OPTIONAL) settingsFilePath

## android

### parameters
- projectName
  (used to name your apk)
- server
- storepass
- keystoreFilePath
  (About keystore file http://developer.android.com/tools/publishing/app-signing.html)
- (OPTIONAL) apkOutputPath (DEFAULT: .meteor-builds/${projectName}.apk)
- (OPTIONAL) mobileSettingsFilePath

### extra steps
Publish your apk file at https://play.google.com/apps/publish
