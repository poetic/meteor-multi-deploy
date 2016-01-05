# The Goal
Automate the deployment of a meteor project to multiple platforms.

# Get Started
After creating a deploy.json under your meteor directory,
you can use ***meteor-multi-deploy(mmd)*** to deploy to multiple platforms.

An example of deploy.json
```json
{
  platforms: [
    {
      platform: 'modulus',
      settings: 'settings.production.json',
      name: 'modulus-project-name',
    }
  ]
}
```

# Platforms
## modulus
## ios
## android
