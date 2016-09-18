(function () {
'use strict';

angular.module('LunchApprover', [])


.controller('LunchApproverController', function ($scope) {

  $scope.items = "";
  $scope.message = "";

  $scope.check = function () {
    if ($scope.items === "") {
      $scope.message = "Please enter data first";
      return;
    }
    var size = calculateFoodChoices($scope.items);

    if (size <= 3) {
      $scope.message = "Enjoy";
    } else {
      $scope.message = "Too much!";
    }
  };

  $scope.clear = function () {
    $scope.items = "";
    $scope.message = "";
  }

  function calculateFoodChoices(string) {
    var array = string.split(",");

    return array.length;
  }

});


})();
