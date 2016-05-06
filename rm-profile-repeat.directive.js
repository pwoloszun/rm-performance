(function (angular) {
  'use strict';

  var watchersCount = function (selector) {
    var root = angular.element($(selector));
    var watchers = [];
    var f = function (element) {
      angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
        var elData = element.data();
        if (elData && elData.hasOwnProperty(scopeProperty)) {
          angular.forEach(elData[scopeProperty].$$watchers, function (watcher) {
            if (watchers.indexOf(watcher) < 0) {
              watchers.push(watcher);
            }
          });
        }
      });

      angular.forEach(element.children(), function (childElement) {
        f(angular.element(childElement));
      });
    };
    f(root);

    return watchers.length;
  };

  var rmPerformanceModule = angular.module('rocketmind.performance', []);

  rmPerformanceModule.directive("rmProfileRepeat", [
    function () {
      return {
        priority: 0,
        restrict: "A",
        compile: function () {
          var startDt;
          return {
            pre: function (scope) {
              if (scope.$first && !startDt) {
                startDt = new Date();
              }
            },
            post: function (scope, element, attrs) {
              if (scope.$last) {
                console.log("qq", attrs.rmProfileRepeat);
                var options = attrs.rmProfileRepeat.length > 0 ? JSON.parse(attrs.rmProfileRepeat) : {};
                var hasRegistered = false;
                scope.$watch(function () {
                  if (hasRegistered) return;
                  hasRegistered = true;
                  scope.$$postDigest(function () {
                    hasRegistered = false;
                    var stopDt = new Date();

                    if(options["showWatchersCount"]) {
                      console.log("time (ms):", (stopDt - startDt), "watchers:", watchersCount(element));
                    } else {
                      console.log("time (ms):", (stopDt - startDt));
                    }
                  });
                });
              }
            }
          }
        }

      };
    }
  ]);

})(angular);