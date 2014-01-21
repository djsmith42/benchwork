(function() {
var app = angular.module("BenchworkApp", ["BenchworkServices"])

app.controller("MainController", function($scope, $log, bwTimeIt) {
  $scope.test1 = function() {
    $log.info("Starting test 1");
    bwTimeIt(function() {
      $scope.test1things = [];
      for (var i=0; i<1000; i++) {
        $scope.test1things.push({a: i});
      }
    }).then(function(ms) {
      $scope.test1results = {ms: ms};
    });
  }
});

angular.module("BenchworkServices", []).
factory('bwTimeIt', function($rootScope, $q, bwNow) {
  return function(fn) {
     var deferred = $q.defer();
     setTimeout(function() {
       $rootScope.$digest();
       setTimeout(function() { // get out of any digest in progress
         fn();
         var start = bwNow();
         $rootScope.$digest()
         var end = bwNow();
         deferred.resolve(end-start);
         $rootScope.$digest(); // so our promise gets delivered
       });
     });

     return deferred.promise;
   }
}).
factory('bwNow', function($window) {
  return function() {
    if ($window.performance) {
      return $window.performance.now();
    } else {
      return (new Date).getTime();
    }
  }
});

})();
