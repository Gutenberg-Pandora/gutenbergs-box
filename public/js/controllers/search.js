angular.module('mean.search').controller('SearchController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.master= {};

    $scope.update = function(user) {
     $scope.master= angular.copy(user);
    };

    $scope.reset = function() {
     $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
 
}]);
