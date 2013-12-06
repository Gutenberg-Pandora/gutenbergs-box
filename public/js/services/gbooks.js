//A service to hook in to google book
angular.module('mean.gbooks').factory('GBooks',['$resource', function($resource) {
    var base_url = 'http://www.books.google.com/books';
    
    var api_url = 'https://www.googleapis.com/books/';
    var api_version = 'v1';
    var volume_url = api_url + api_version + '/volumes/:id';
    
    var gservice = {
        dyn_links : $resource(base_url, {callback: 'JSON_CALLBACK'},
                     {  'get': {method:'JSONP'}
                     }),
        
        volume_info : $resource(volume_url, {callback: 'JSON_CALLBACK'},
                     {  'get': {method:'JSONP'}
                     })
    };
    
    return gservice;

}]);
