//Controller for searching and recommending books
angular.module('mean.search').controller('SearchController',
                                         ['$scope',
                                             '$log',
                                             '$location',
                                             'Global',
                                             'Search',
                                             'GBooks',
                                             function ($scope, $log, $location, Global, Search, GBooks) {

    $scope.recommend = function() {
        
        $location.path('results/' + this.title);
         
    };
    
}]);
