//Search service used for recommender REST endpoint
angular.module('mean.search').factory('Search', ['$resource', function($resource) {
    var searchService = {
        recommend : $resource('recommend/', {callback: 'JSON_CALLBACK'},
                     {  'get':    {method:'JSONP', isArray:true },
                        'query':  {method:'JSONP', isArray:true },
                     }),
        classify : $resource('classify/', {callback: 'JSON_CALLBACK'},
                     {  'get':    {method:'JSONP', isArray:true },
                        'query':  {method:'JSONP', isArray:true },
                     })
    };
                    //https://groups.google.com/forum/#!topic/angular/GORFNLPp6Hc
    
    return searchService;
}]);
