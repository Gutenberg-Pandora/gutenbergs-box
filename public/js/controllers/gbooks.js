//Controller for Google Books functionality
angular.module('mean.gbooks').controller('GBooksController',
                                         ['$scope',
                                             '$log',
                                             'Global',
                                             'GBooks',
                                             function ($scope, $log, Global, GBooks) {

    $scope.get_links = function(ocn) {
        var success  = function(result) {
            var objname = "OCLC:" + ocn;
            var robj =result[objname]; 
            $log.log(robj);
            $scope.google_stats = robj;
        };

        var error = function(result) {
            $log.error('request failed');
            $log.error(result);
        };

        var query_params = {
            bibkeys: 'OCLC:' + ocn,
            jscmd: 'viewapi'
        };
      
        GBooks.get(query_params, success, error);
    };
    
}]);
