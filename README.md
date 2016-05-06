rmProfileRepeat
========

Angular performance tracking for ngRepeat: watchers and render time

## Basic Usage
* download, clone or fork it
* Include the `rm-profile-repeat.directive.js` script provided by this component into your app.
* Add `'rocketmind.performance'` as a module dependency to your app: `angular.module('app', ['rocketmind.performance'])`


**Use on HTML template**
```html
<div
  ng-repeat="iterator in collection"
  rm-profile-repeat='{"showWatchersCount": true}'
>...</div>
```
