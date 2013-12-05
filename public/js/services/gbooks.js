//A service to hook in to google book
angular.module('mean.gbooks').factory('GBooks',['$resource', function($resource) {
    var base_url = 'http://www.books.google.com/books';
    
    return $resource(base_url, {callback: 'JSON_CALLBACK'},
                     {  'get': {method:'JSONP'}
                     });

}]);
