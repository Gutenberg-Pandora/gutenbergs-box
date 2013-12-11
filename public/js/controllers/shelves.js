angular.module('mean.shelves').controller('ShelvesController', 
										['$scope', 
										'$routeParams', 
										'$location',
										'$log', 
										'Global', 
										'Shelves',
										'GBooks',
										'Search', 
										function ($scope, $routeParams, $location, $log, Global, Shelves, GBooks, Search) {
    $scope.global = Global;

    $scope.create = function() {
		Shelves.createShelf(this.title);
		$location.path('results/' + this.title);  
		//this.title = "";
		//this.content = "";
    };

    $scope.delete = function() {
		Shelves.deleteShelf(this.shelfId);
    };

    $scope.find = function() {
		Shelves.getShelves(function(data) {
			$scope.shelves = data;
		});
    };

    $scope.changeShelf = function(title) {
        $location.path('results/' + title);  
    };

}]);