Serina | GitHub page [here](https://foxdog05000.github.io/serina/)
======

[![Build Status](https://travis-ci.org/foxdog05000/serina.svg?branch=master)](https://travis-ci.org/foxdog05000/serina)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/foxdog05000/serina/blob/master/LICENSE)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

> GUI for create translation files for i18next

![Serina Screenshot](https://raw.githubusercontent.com/foxdog05000/serina/master/sample.png)

_Serina R0.2.1_

## Download

Serina can be downloaded [here](https://github.com/foxdog05000/serina/releases). Available versions for Linux and Windows (64bits). _MacOS available to later_

To use, unzip in the desired location and execute Serina.

If you need a different version, please follow the _development_ instructions to make your own build from the source code

## Usage
Serina allows you to create translations for each language, you can access the different languages by clicking on their map in the languages list.

### Create translation for a language
This page displays the list of languages and allows you to add a new language via a form using the ISO 639-1 language code. Example:"FR" or "EN".

The display of the languages is available in two versions (card list or list) that can be set on the parameter page. The number of elements in a language is displayed under the name of the language.

### Edit translation

This page displays the groups and translations of the first level of the translation and then recursively displays the sub-levels via access to a group allowing access to its content.

Adding a group is done via a modal that allows you to enter the group name. The modification will also be done via a modal which will ask for the new name of the group. Deleting a group will ask for confirmation before deleting.

The addition of a translation is done via a card added to the list of translations. The recording and deletion is done directly with the icons on the map.

Changing a translation triggers a key or value change detection system to know whether to display the save button in order to have a good interface.

#### Search

A search bar represented by a magnifying glass is integrated in the toolbar. The research focuses on the "keys" of translations.
The first corresponding element will be selected to highlight it. And if several items match the search, a navigation between the corresponding items is displayed next to the search bar.

#### Parallel edition of two languages

Parallel entry of two languages is done via the "swap" (on the right-hand side of the groups and translations of the first level) comprising:
the main language (the one selected in the list of languages)
the second language that can be chosen from the other available languages.

Then it is enough to validate and the second language is automatically added below each value of the main language. Parallel editing works exactly like simple language editing.

### Parameters

The settings allow you to modify the app according to your preferences. A "About" section is also present to get details about the application.

#### Basic parameters
- The format of the language list (in card list or list)
- The language of the application (EN, ES or FR for the moment)

#### Advanced parameters
- Custom location of translation files (Available in version 0.3)

#### Others parameters
- The theme of the application
- Keyboard shortcuts

## FAQ

#### Your language is not available in the app ?
You can translate the application and submit your translation in PR.

#### Your language doesn't have its flag displayed ?
You can open a issue to explain your problem with a screenshot if possible.

## Development

If you want to contribute to Serina, create a new different version of Serina, or compile it from source code, follow these instructions.

Clone/download source code from the github repo. Make sure you have _node_, _npm_, _yarn_ already installed in your system:

1. `yarn` to install all the dependencies.
2. `yarn start` to start _API_ on `localhost:7777`.
3. `grunt serve` to start _Serina_ on `localhost:9000`.
4. `yarn run package` to build _serina_ for linux (build will be placed in `packages` folder).
    * `grunt package` to make builds for windows, linux and mac os.
    * `grunt package:win32` to make build for windows (64bits).
    * `grunt package:linux` to make build for linux.
    * `grunt package:macos` to make build for mac os (64bits).
5. `grunt test` to run the automated tests.
    * Please, ensure the tests are passing before creating a pull requests. Add tests for your changes.

## Acknowledgments

* [Electron](https://electron.atom.io)  framework was used for the app development.

## License

Serina is being developed and maintained as Open-Source software by @foxdog05000 (https://github.com/foxdog05000) licensed under [MIT LICENSE](https://github.com/foxdog05000/serina/blob/master/LICENSE)

The original source code can be found at: <https://github.com/foxdog05000/serina>
