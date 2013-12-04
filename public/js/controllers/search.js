//Controller for searching and recommending books
angular.module('mean.search').controller('SearchController',
                                         ['$scope',
                                             '$log',
                                             'Global',
                                             'Search',
                                             function ($scope, $log, Global, Search) {

    $scope.recommend = function() {
        var success  = function(result) {
            $scope.results_list = result;
        };

        var error = function(result) {
            $log.error('request failed');
            $log.error(result);
        };

        var query_params = {
            title : this.title
        };
      
        Search.get(query_params, success, error);
    };
 
}]);
