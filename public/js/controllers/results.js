//Controller for searching and recommending books
angular.module('mean.search').controller('ResultsController',
                                         ['$scope',
                                             '$log',
                                             '$routeParams',
                                             'Global',
                                             'Search',
                                             'Results',
                                             'GBooks',
                                             function ($scope, $log, $routeParams, Global, Search, Results, GBooks) {

    $scope.update = function() {
        $scope.results_list = Results.getRecommendResults();
        $scope.google_stats = {};
        for (var i = 0; i < $scope.results_list.length; i++) {
            $scope.get_links($scope.results_list[i].ocn);
            $scope.results_list[i].title = $scope.results_list[i].title.replace('/', '');
        }
    };
    
    $scope.get_links = function(ocn) {
        var success  = function(result) {
            var objname = 'OCLC:' + ocn;
            var robj = result[objname];
            $log.log(robj);
            
            if (!robj) {
                return;
            }

            var t_url = robj.thumbnail_url;
            
            if (t_url) {
                robj.thumbnail_url = t_url.replace('zoom=5', 'zoom=1');
            }
            else {
                robj.thumbnail_url = 'http://books.google.com/googlebooks/images/no_cover_thumb.gif';
            }

            var idRe = /(id=[^&]*)/;
            var idstr = idRe.exec(robj.info_url);
            
            robj.id = idstr[1].slice(3);
            
            robj.description = 'A book';//Remove for production
            
            $scope.google_stats[ocn] = robj;
             
            //$scope.get_info(robj.id, ocn); //Uncomment for production
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

    $scope.get_info = function(id, ocn) {//This will use up our quota of Google Books API requests.
        var success = function(result) {
            $scope.google_stats[ocn].description = result.volumeInfo.description;
        };

        var error = function(result) {
            $log.error('request failed');
            $log.error(result);
        };
        
        var query_params = {
            'id' : id,
            'key' : 'AIzaSyDOjrALRncMzbctiIbxGmEwgOAACANCLS0'
        };

        GBooks.volume_info.get(query_params, success, error);
    };

    $scope.$on($scope.$destroy, function() {
        if ($scope.listening) {
            Results.unregister(index);
        }
    });
    
    if (!$scope.listening) {
        var index = Results.register('ResultsPage', function() {
            $scope.update();
        });
        $scope.listening = {
            'index' : index
        };
    }

}]);

