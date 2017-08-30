[![Build Status](https://travis-ci.org/foxdog05000/serina.svg?branch=master)](https://travis-ci.org/foxdog05000/serina)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/foxdog05000/serina/blob/master/LICENSE)

![Preview of Serina](https://github.com/foxdog05000/serina/blob/master/sample.png)

# Serina (Dev in progress)

## Recover dependancies
Before launch app and api, recover dependencies npm and bower
```
yarn (or : npm install && bower install)
```

## Development app + API

Run `grunt serve` for app preview on `localhost:9000`.

And run API node in `/api` and api on listen `localhost:7777`.
```
npm start
```

## Testing

Running `grunt test` will run the unit tests with karma.

## Build app and API on Electron app (Win32 : ready / Linux : ready)
Run `grunt package` for building (linux and win32) electron app via grunt-electron-packager.   
_Run grunt package:linux or grunt package:win32 to build a specific version_
