//Search service used for recommender REST endpoint
angular.module('mean.search').factory("Search", ['$resource', function($resource) {
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
    //TODO: Talk to the server and get something the controller can use.
}]);
