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

    $scope.changeShelf = function(sn) {
        //$location.path('results/' + title);  
        var success = function(result) {
            console.log(result);
            console.log(result.length);
            if (result.length === 0) {
                $scope.failed[sn] = true;
                console.log($scope.failed);
                return;
            }

            Results.setRecommendResults(result);
            $route.reload();
        };
    
        var error = function(result) {
            $log.error('result failed');
            $log.error(result);
        };

        var query_params = {
            'sn' : sn,
        };

        if (sn) { console.log(sn); }
        
        Search.recommend.get(query_params, success, error);
    };
}]);
