angular.module('mean.shelves').controller('ShelvesController', 
										['$scope', 
										'$routeParams', 
										'$location',
										'$log',
										'$route', 
										'Global', 
										'Shelves',
										'Search',
										'Results', 
										function ($scope, $routeParams, $location, $log, $route, Global, Shelves, Search, Results) {
    $scope.global = Global;

    $scope.create = function(title, swid) {
		Shelves.createShelf(title, swid);
		this.changeShelf(swid);  
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

    $scope.changeShelf = function(swid) {
        //$location.path('results/' + title);  
        var success = function(result) {
            Results.setRecommendResults(result);
            $route.reload();
        };
    
        var error = function(result) {
            $log.error('result failed');
            $log.error(result);
        };

        var query_params = {
            'swid' : swid,
        };

        if (swid) { console.log(swid); }
        
        Search.recommend.get(query_params, success, error);
    };
}]);