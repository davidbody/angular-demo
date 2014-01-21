'use strict';

var mathApp = angular.module('MathApp', []);

mathApp.controller('CalculationController', ['$scope', '$http', function($scope, $http) {
  $scope.params = {
    n1: 0,
    n2: 0,
    op: '+'
  };

  $scope.$watch('params.n1', function(newValue, oldValue) {
    if (!$scope.n2Overridden) {
      $scope.params.n2 = newValue;
    }
  });

  $scope.$watch('params.n2', function(newValue, oldValue) {
    if ($scope.params.n2 != $scope.params.n1) {
      $scope.n2Overridden = true;
    }
  });

  $scope.calculate = function() {
    $scope.result = '';
    $scope.errors = '';

    $http.get('/calculate', {params: $scope.params}).
      success(function(data, status, headers, config) {
        $scope.result = data.result;
      }).
      error(function(data, status, headers, config) {
        if (data.errors) {
          $scope.errors = data.errors;
        } else {
          alert("Something went wrong.");
        }
      });
  };

  $scope.operations = ['+', '-', '*', '/'];

}]);

mathApp.directive('activeModelErrors', function() {
  return {
    restrict: 'E',
    scope: {
      errors: '='
    },
    template: "<span class=\"error\" ng-cloak ng-repeat=\"error in errors\">{{ error }}{{ $last ? '' : ';' }}</span>"
  };
});
