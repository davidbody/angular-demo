'use strict';

var mathApp = angular.module('mathApp', []);

mathApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.calculate = function() {
      var params;

      $scope.result = '';
      $scope.errors = '';

      params = {
        n1: $scope.n1,
        n2: $scope.n2
      };

      $http.get('/add', {params: params}).
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
  }]);
