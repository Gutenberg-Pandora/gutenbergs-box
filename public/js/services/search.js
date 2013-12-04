//Search service used for recommender REST endpoint
angular.module('mean.search').factory('Search', ['$resource', function($resource) {
    return $resource('recommend/', {callback: 'JSON_CALLBACK'},
                     {  'get':    {method:'JSONP', isArray:true },
                        'query':  {method:'JSONP', isArray:true },
                     });//https://groups.google.com/forum/#!topic/angular/GORFNLPp6Hc
}]);
