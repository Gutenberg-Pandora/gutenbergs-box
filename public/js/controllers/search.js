//Controller for searching and recommending books
angular.module('mean.search').controller('SearchController',
                                         ['$scope',
                                             '$log',
                                             'Global',
                                             'Search',
                                             'GBooks',
                                             function ($scope, $log, Global, Search, GBooks) {

    $scope.recommend = function() {
        var success  = function(result) {
            $scope.google_stats = {};
            for (var i = 0; i < result.length; i++) {
                $scope.get_links(result[i].ocn);
            }
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
    
    $scope.get_links = function(ocn) {
        var success  = function(result) {
            var objname = 'OCLC:' + ocn;
            var robj = result[objname];
            $log.log(robj);
            var t_url = robj.thumbnail_url;
            robj.thumbnail_url = t_url.replace('zoom=5', 'zoom=1');
            var idRe = /(id=[^&]*)/;
            var idstr = idRe.exec(robj.info_url);
            robj.id = idstr[1].slice(3);
            $scope.google_stats[ocn] = robj;
        };

        var error = function(result) {
            $log.error('request failed');
            $log.error(result);
        };

        var query_params = {
            bibkeys: 'OCLC:' + ocn,
            jscmd: 'viewapi'
        };
      
        GBooks.dyn_links.get(query_params, success, error);
    };
 
}]);
