//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
<<<<<<< HEAD
        when('/shelves', {
            templateUrl: '/views/shelves/list.html'
        }).
        when('/shelves/create', {
            templateUrl: '/views/shelves/create.html'
        }).        
=======
>>>>>>> b4c136e882f1fd5f5a99cdd54eb03a31fc5de596
        when('/results/:title', {
            templateUrl: 'views/search/results.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
