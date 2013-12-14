//Controller for searching and recommending books
angular.module('mean.search').controller('SearchController',
                                         ['$scope',
                                             '$log',
                                             '$location',
                                             'Global',
                                             'Search',
                                             'Results',
                                             function ($scope, $log, $location, Global, Search, Results) {

    $scope.recommend = function (sn) {
        var success = function(result) {
            console.log(result.length);
            if (result.length === 0) {
                $scope.failed[sn] = true;
                console.log($scope.failed);
                return;
            }
            Results.setRecommendResults(result);
            $location.path('results/');
        };
    
        var error = function(result) {
            $log.error('result failed');
            $log.error(result);
        };

        var query_params = {
            'sn' : sn
        };

        if (sn) { console.log(sn); }
        
        Search.recommend.get(query_params, success, error);

    };

    $scope.classify = function(title) {
        var success = function(result) {
            $scope.results_list = result;
        };
        
        var error = function(result) {
            $log.error('result failed');
            $log.error(result);
        };

        var query_params = {
            'title' : title
        };

        Search.classify.get(query_params, success, error);
    
    };
    
}]);
