# ngrx-helpers
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Codacy Badge][codacy-image]][codacy-url]

> This package can be used to reduce the amount of boilerplate code you have to write using ngrx.

## Installation and Prerequisites/Dependencies

Install by using ``npm install --save @omm/ngrx-helpers``

To function properly, this package has some peer dependencies, which have to be installed as well.

To use the module, just add it to your angular module:

```
@NgModule({
    imports: [
        NgrxHelpersModule.forRoot({apiBasePath: "http://localhost:3000"})
    ]
})
export class AppModule {
}
```

## TL;DR

To reduce the amount of boilerplate code in ngrx projects, this package uses a construct we call "resource".
A resource is configured at application start and the configuration is used during runtime to generate actions, 
select them in effects and much more.  
The ngrx library will not be patched or edited in any way. 
Hence, you can always move away from this library if you need a more customized implementation.


## Usage

The goal of this project is to provide a library which can be selectively applied to your project, 
just the way you need it to and not just as a whole. 
All usages are tested and displayed in the example-app provided in this repository. To run the example-app refer to chapter **example-app**.

Summarizing, this project provides helpers for:
* effects
* reducers
* actions
* rest calls

To use these helpers, you are required to create a resource and configure it.

### Config of resources

Resource in example-app: [PlantsResource](\example-app\app\resources\plants.resource.ts)

### Reducers

Based on a configured resource, the substate for that resource can be managed by a generic reducer (powered by ngrx entity).
Below reducer adjusts the state according to each of the possible resource's actions.

```
export function reducer(state: EntityState<IMachine> = initialState, action: ISuccessAction): IState {
    return ReducerHelper.genericReducer<IMachine, MachinesResource>(state, action, MachinesResource);
}
```

### Effects

#### Handle all actions of a resource

Below code-snippet displays how you can handle all actions concerning one resource in just 2 lines of code.
This includes:
 * selecting all relvant actions
 * requesting the resources from the backend
 * transforming error or success responses to the appropriate actions, which then will be handled by the genericReducer

``` 
@Effect()
genericMachineActions$ = this.effectHelperService.handle(this.actions$, MachinesResource);
```

### Actions

Actions are no longer implemented manually, but are generically generated from your resource configuration. For instance, 
below function will create a ngrx action, to load one element (identified by its ID) of the TestResource.

```
createAction(TestResource, "LoadOne", {id: 5})
```

Above function call returns below action object (ngrx conform):

```
{
    "type": "ngrx-helpers: [TestResource] LoadOne - request",
    "action": "LoadOne",
    "payload": {
        "id": 5
    }
}
```


### Dispatch Service

Helper to shortcut creation of a resource action and dispatching it to the ngrx store. Below code snippet creates an action, 
requesting the update of the object "newValues" (object is identified by some kind of id). 

```
this.dispatchService.dispatch(MachinesResource, "UpdateOne", newValues);
```

### Rest Helper Service

REST APIs are should use a defined structure how to execute certain acions (e.g. get all elements of a specific path)
According to this specification, the restHelperService provides a httpClient implementation, which provides CRUD features.

## example-app

For development, we use the [example-app](./example-app) generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.
In this project, you can find the various use cases of the library and how example configurations might look like.
As the project evolves, we will try to keep up with the latest angular-cli and ngrx releases to ensure compatibility.

### To run the example:  

**Frontend**
* ``npm install``
* Run `ng serve` for a dev server. 
* Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**Backend**
* ``npm install -g json-server``
* ``cd /example-app/backend``
* ``json-server --watch db.json``

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
[travis-image]: https://travis-ci.org/ommsolutions/ngrx-helpers.svg?branch=master
[travis-url]: https://travis-ci.org/ommsolutions/ngrx-helpers?branch=master
[coveralls-image]: https://coveralls.io/repos/github/ommsolutions/ngrx-helpers/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/ommsolutions/ngrx-helpers?branch=master
[codacy-image]: https://api.codacy.com/project/badge/Grade/56c25e0de47445d699ab84040d966c77
[codacy-url]: https://www.codacy.com/app/enenkel/ngrx-helpers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ommsolutions/ngrx-helpers&amp;utm_campaign=Badge_Grade
