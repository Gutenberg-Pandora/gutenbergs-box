//Articles service used for articles REST endpoint
angular.module('mean.shelves').factory("Shelves", ['$http', function($http) {
    //return $resource('/users/me/shelf/:bookId');
	return {
		getShelves: function(callback) {
			return $http.get('users/me/shelf').success(callback);
		},
		createShelf: function(title, swid) {
			return $http.put('users/me/shelf/' + title + "/" + swid);
		},
		deleteShelf: function(shelfId) {
			return $http.delete('users/me/shelf/' + shelfId);
		}
	};
}]);