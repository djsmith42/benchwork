(function() {
var app = angular.module("BenchworkApp", ["BenchworkServices"])

app.controller("MainController", function($scope, $log, bwNow) {
  $scope.test1 = function() {
    $log.info("Starting test 1");
    $scope.$$postDigest(function() {
        var end = bwNow();
        $scope.test1results = {ms: end-start}
        $scope.$apply();
    });
    var start = bwNow();
    $scope.test1things = [];
    for (var i=0; i<1000; i++) {
      $scope.test1things.push({a: i});
    }
  }
});

angular.module("BenchworkServices", []).
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
