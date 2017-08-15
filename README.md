[![Build Status](https://travis-ci.org/foxdog05000/serina.svg?branch=master)](https://travis-ci.org/foxdog05000/serina)

![Preview of Serina](https://github.com/foxdog05000/serina/blob/master/sample.jpg)

# Serina (Dev in progress)

## Recover dependancies
Before launch app and api, recover dependencies npm and bower
```
yarn (or npm install && bower update)
```

## Development app + API

Run `grunt serve` for preview on `localhost:9000`.

And run API node in `/api` and listen `localhost:3000`.
```
npm start
```

## Testing

Running `grunt test` will run the unit tests with karma.

## Build app and API on Electron app (Win32 : ready / Linux : ready)
Run `grunt package` for building electron app via grunt-electron-packager.  
