Serina
======

[![Build Status](https://travis-ci.org/foxdog05000/serina.svg?branch=master)](https://travis-ci.org/foxdog05000/serina)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/foxdog05000/serina/blob/master/LICENSE)

> App for create translation files for i18next

![Serina Screenshot](https://github.com/foxdog05000/serina/blob/master/sample.png)

_Serina R0.1_

## Download
Serina can be downloaded [here](https://github.com/foxdog05000/serina/releases). Available versions for Linux and Windows (64bits). _MacOS available to later_

To use, unzip in the desired location and execute Serina.

If you need a different version, please follow the _development_ instructions to make your own build from the source code

## Development
If you want to contribute to Serina, create a new different version of Serina, or compile it from source code, follow these instructions.

Clone/download source code from the github repo. Make sure you have _node_, _npm_, _yarn_,  _bower_ already installed in your system:

1. `yarn` to install all the dependencies.
2. `yarn start` to start _API_ on `localhost:7777`.
3. `grunt server` to start _Serina_ on `localhost:9000`.
4. `yarn run package` to build _serina_ for linux (build will be placed in `packages` folder).
    * `grunt package` to make builds for windows and linux.
    * `grunt package:win32` to make build for windows (64bits).
    * `grunt package:linux` to make build for linux.
5. `grunt test` to run the automated tests.
    * Please, ensure the tests are passing before creating a pull requests. Add tests for your changes.

## Acknowledgments
* [Electron](https://electron.atom.io)  framework was used for the app development.

## License
Serina is being developed and maintained as Open-Source software by @foxdog05000 (https://github.com/foxdog05000) licensed under [MIT LICENSE](https://github.com/foxdog05000/serina/blob/master/LICENSE)

The original source code can be found at: <https://github.com/foxdog05000/serina>
