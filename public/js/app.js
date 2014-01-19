'use strict';

var mathApp = angular.module('mathApp', []);

mathApp.controller('CalculationController', ['$scope', '$http', function($scope, $http) {
  $scope.params = {
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
    var params;

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
