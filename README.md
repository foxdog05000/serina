# serina

## Recover dependancies
Before launch app and api, recover dependencies npm and bower
```
yarn
```

## Development app + API

Run `grunt serve` for preview on `localhost:9000`.

And run API node in `/api` and listen `localhost:3000`.
```
node api.js
```

## Testing

Running `grunt test` will run the unit tests with karma.

## Build app and API on Electron app

Run `grunt build` for building electron app via grunt-electron-packager.  
