(function(){
    'use strict';

    var request = require('request');
    //var validator = require('validator');
    //var sanitize = validator.sanitize;
    var parseString = require('xml2js').parseString;

    /**
     * WorldCat
     *
     * Constructor for this module.
     *
     * @param apiKey
     * @return a new WorldCat instance
     */
    function WorldCat(apiKey) {
        apiKey = apiKey ? apiKey : '';
        if (!(this instanceof WorldCat)) {
            return new WorldCat(apiKey);
        }

        this.apiKey = apiKey;
    }
    
    /**
     * classify
     *
     * Right now, this takes a book title and returns the SWID of
     * the top item in the results from the server.
     * The SWID identifies the FRBR grouping.
     *
     * @param title
     * @param callback
     * @return undefined
     */
    WorldCat.prototype.classify =  {
        grabFirst : function(params, callback) {
            params.maxRecs = 1;
            params.summary = 'true';
            var url = 'http://classify.oclc.org/classify2/Classify';
            console.log(params);

            var codes = {
                good : {
                    0 : 'Single-Work summary',
                    2 : 'Single-work detail',
                    4 : 'Multi-work response',
                },
                bad : {
                    100 : 'No input',
                    101 : 'Invalid input',
                    102 : 'Not found',
                    200 : 'Unexpected error'
                }
            };
      
            var rcallback = function(err, result) {
                if (err) {
                    console.log('there has been an error');
                    console.log(err);
                    callback(err, null);
                }
                else {
                    var xml = result.body;
                    var xcallback = function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        }
                        else {
                            var code = result.classify.response[0].$.code;
                            if (code in codes.good) {
                                var swid = -1;
                                if (code === '0') {
                                    swid = result.classify.work[0]._;
                                }
                                else {
                                    swid = result.classify.works[0].work[0].$.swid;
                                }
                                callback(null, swid);
                            }
                            else {
                                var serviceError = 'Service error: ' + codes.bad.code;
                                callback(serviceError, null);
                            }
                        }
                    };
                      
                    parseString(xml, xcallback);
                }
            };

            request.get({
                'url': url,
                'qs' : params
            }, rcallback);
        },

        getAll : function (params, callback){
            params.summary = 'false';
            var url = 'http://classify.oclc.org/classify2/Classify';

            var codes = {
                good : {
                    0 : 'Single-Work summary',
                    2 : 'Single-work detail',
                    4 : 'Multi-work response',
                },
                bad : {
                    100 : 'No input',
                    101 : 'Invalid input',
                    102 : 'Not found',
                    200 : 'Unexpected error'
                }
            };
      
            var rcallback = function(err, result) {
                if (err) {
                    console.log('there has been an error');
                    console.log(err);
                    callback(err, null);
                }
                else {
                    var xml = result.body;
                    var xcallback = function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        }
                        else {
                            var code = result.classify.response[0].$.code;
                            if (code in codes.good) {
                                var parseWork = function(work) {
                                    var item = {
                                        title : work.title,
                                        author : work.author,
                                        format : work.format,
                                        swid : work.swid
                                    };
                                    return item;
                                };
                                var list = [];
                                if (code === '0') {
                                    var work = result.classify.work[0]._;
                                    var item = parseWork(work);
                                    list.push(item);
                                }
                                else if (code === '4') {
                                    var works = result.classify.works[0].work;
                                    works.forEach(function(work) {
                                        work = work.$;
                                        //console.log(work);
                                        var item = parseWork(work);
                                        list.push(item);
                                    });
                                }
                                callback(null, list);
                            }
                            else {
                                var serviceError = 'Service error: ' + codes.bad.code;
                                callback(serviceError, null);
                            }
                        }
                    };
                      
                    parseString(xml, xcallback);
                }
            };

            request.get({
                'url': url,
                'qs' : params
            }, rcallback);
        }
    };

    WorldCat.prototype.recommend = {
      /**
       * byNumber
       *
       * Gets a list of recommended books based on a standard id of some sort.
       * WorldCat doesn't recognize all ids, so try to use ones they provide,
       * rather than ISBN's and such. Better, just don't call this directly;
       * call byTitle instead.  It will deal with such things.
       *
       * @param worldCatId
       * @param callback
       * @return undefined
       */
        byNumber : function(worldCatId, callback, less) {
            var url = 'http://experimental.worldcat.org/recommender/MLT/' + worldCatId;
            
            var codes = {
                good : {0 : 'Success'},
                bad : {
                    4 : 'No reccomendations',
                    6 : 'Not found',
                    8 : 'Invalid request',
                    12 : 'Unknown error'
                }
            };
        
            var rcallback = function(err, result) {
                if (err) {
                    console.log('There has been an error');
                    console.log(err);
                    callback(err, null);
                }
                else {
                    var xml = result.body;
                    
                    var xcallback = function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        }
                        
                        var badCode;
                        var code;
                        try {
                            badCode = result.pages.response[0].$.code;
                        }
                        catch (e){
                        }
                        try {
                            code = result.mlt.response[0].$.code;
                        }
                        catch (e){
                        }
                      
                        if (code && code in codes.good) {
                            var list = result.mlt.likeItems[0].likeItem;

                            if (less) {
                                var Minimal = function(title, author, ocn){
                                    this.title = title;
                                    this.author = author;
                                    this.ocn = ocn;
                                };

                                var minList = [];

                                list.forEach(function(item) {
                                    var title = item.$.title;
                                    var author = item.$.author;
                                    var ocn = item.$.ocn;

                                    var minimized = new Minimal(title, author, ocn);
                                    minList.push(minimized);
                                });

                                list = minList;
                            }
                            
                            callback(null, list);
                        }
                        else if (badCode){
                            console.log(badCode);
                            var serviceError = 'Service error: ' + codes.bad.badCode;
                            callback(serviceError, null);
                        }
                        
                    };
                  
                    parseString(xml, xcallback);
                }
            };

            request.get(url, rcallback);
        },

        /**
         * byTitle
         *
         * This will give a list of recommended books if
         * you give it a book title.
         *
         * @param title
         * @param callback
         * @return undefined
         */
        byTitle : function(title, callback, less) {
            var numCallback = function(err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    callback(null, result);
                }
            };
            
            var clasCallback = function(err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    WorldCat.prototype.recommend.byNumber(result, numCallback, less);
                }
            };

            WorldCat.prototype.classify.grabFirst({'title': title}, clasCallback);
        }
    };

    module.exports = WorldCat;

    if (require.main === module) {
        //var WorldCat = require('./worldcat');
        var wc = new WorldCat();

        var callback = function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result[0]);
            }
        };

        wc.recommend.byTitle('mistborn', callback);
        wc.recommend.byTitle('the lord of the rings', callback);
        wc.recommend.byTitle('the hobbit', callback);
        wc.recommend.byTitle('the hound of rowan', callback);
        wc.recommend.byTitle('the year of the griffin', callback);
    }
}());
