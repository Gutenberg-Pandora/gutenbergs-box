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
										function ($scope, $routeParams, $location, $log, $route,
                                                    Global, Shelves, Search, Results) {
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
        
        $scope.listen();
        $scope.recommend(sn);
        ////$location.path('results/' + title);  
        //var success = function(result) {
        //    console.log(result);
        //    console.log(result.length);
        //    if (result.length === 0) {
        //        $scope.failed[sn] = true;
        //        console.log($scope.failed);
        //        return;
        //    }

        //    Results.setRecommendResults(result);
        //    $scope.cancel();
        //    $route.reload();
        //};
    
        //var error = function(result) {
        //    $log.error('result failed');
        //    $log.error(result);
        //};

        //var query_params = {
        //    'sn' : sn,
        //};

        //if (sn) { console.log(sn); }
        //
        //Search.recommend.get(query_params, success, error);
    };

    $scope.listening_tag = 'ShelfModal';

    $scope.listen = function() {
        Results.register($scope.listening_tag, function() {
                    $scope.ignore();
                    if (Results.recFailed()) {
                        $scope.failed[Results.getSN()] = true;
                        return;
                    }
                    $scope.cancel();
                    $route.reload();
                });
    };

    $scope.ignore = function() {
        Results.unregister($scope.listening_tag);
    };

}]);
