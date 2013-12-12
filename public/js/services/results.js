//Search service used for recommender REST endpoint
angular.module('mean.search').factory('Results', ['$log', function($log) {
    
    var recommendResults = []; 
    var classifyResults = []; 

    var resultsService = {
        getRecommendResults : function() {
            return recommendResults;
        },
        
        setRecommendResults : function(data) { 
            recommendResults = data;
        },

        getClassifyResults : function() {
            return classifyResults;
        },

        setClassifyResults : function(data) {
            classifyResults = data;
        }

    };
    //http://stackoverflow.com/a/12009408
    
    return resultsService;
}]);
