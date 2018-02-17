# ngrx-helpers
[![NPM version][npm-image]][npm-url]

> This package can be used to reduce the amount of boilerplate code you have to write using ngrx.

## Installation and Prerequisites

Install by using ``npm install --save @omm/ngrx-helpers``

To function properly, this package has some peer dependencies, which have to be installed as well:


## Usage

TODO

This package provides helpers for:
* effects
* reducers
* actions

### All of it!

TODO

### Custom usages

TODO

## repository

### src

TODO

### example-app

For development, we use the [example-app](./example-app) generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.
In this project, you can find the various use cases of the library and how example configurations might look like.
As the project evolves, we will try to keep up with the latest angular-cli and ngrx releases to ensure compatibility.

**For development**
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### testing and test coverage

## Action type pattern

TODO

## Features 

For current features, check the [Changelog](CHANGELOG.md)

## Roadmap

**0.2.0 config extensions**

* Retry logic for HTTP calls
* Add config to choose if request should be cancelled when executed again
* Skip specific steps of the generic handle function

**0.1.0 Initial release**

Features:

* ...

TODO: 
* apply validators when creating new actions
* Include ngrx / entity
* Make API Path configurable
* Make execute request generic based on the actionType
* Implement generic reducer helper
* Make generic type of extendedAction optional
* Adjust readme
* Document example-app
* Add test coverage
* Add CI build tests
* Add e2e tests
* Add coverage report via CI
* Design example app
* Use decorators to configure resource entities


Bugfixes:

TODO: 
 * After http call errors, no more actions are passed through the stream.

## Packaging and publishing

To enable this package to be used with angular (cli) apps, we have to package it according to
the [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview#).
We use [ng-packagr](https://github.com/dherges/ng-packagr) to do this. Just run ``npm run build:lib`` from the main directory.

To publish the current version to npm, use ``npm publish``. Make sure if there are any --tags required (e.g. for beta releases) 
to apply them when publishing. Furthermore, check ``src/package.json`` that the version for publishing is set correctly.

## Contribute

Feel free to create issues for bugs, feature requests, questions and so on ;-)
If you want to add your own features, go ahead and create a pull-request. We appreciate it!


[npm-image]: https://badge.fury.io/js/%40omm%2Fngrx-helpers.svg
[npm-url]: https://badge.fury.io/js/%40omm%2Fngrx-helpers
