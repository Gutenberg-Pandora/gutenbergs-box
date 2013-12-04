//Controller for searching and recommending books
angular.module('mean.search').controller('SearchController',
                                         ['$scope',
                                         'Global',
                                         'Search',
                                         function ($scope,  Global, Search) {

    $scope.recommend = function() {
        var callback = function(results_list) {
            $scope.results_list = results_list;
        };

        var query = {
            title : this.title
        };
        
        Search.get(query, callback);
    };
 
}]);
