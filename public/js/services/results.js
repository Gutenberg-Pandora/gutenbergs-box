//Search service used for recommender REST endpoint
angular.module('mean.search').factory('Results', ['$log', function($log) {
    

    var resultsService = {
        setSN : function(sn) {
            this.sn = sn;
        },

        getSN : function() {
            return this.sn;
        },

        getRecommendResults : function() {
            return this.recommendResults;
        },
        
        setRecommendResults : function(data) {
            this.recommendResults = data;
            for (var listener in this.rec_listeners) {
                this.rec_listeners[listener]();
            }
        },

        recFailed : function() {
            return this.recommendResults.length === 0;
        },

        getClassifyResults : function() {
            return this.classifyResults;
        },

        setClassifyResults : function(data) {
            this.classifyResults = data;
        },

        register : function (listener, handler) {
            this.rec_listeners[listener] = handler;
        },
        
        unregister : function (listener) {
            delete this.rec_listeners[listener];
        },

        sn : -1,

        recommendResults : [],
        
        classifyResults : [],

        rec_listeners : {}
    };
    //http://stackoverflow.com/a/12009408
    
    return resultsService;
}]);
