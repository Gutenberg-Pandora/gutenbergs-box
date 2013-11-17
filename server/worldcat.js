(function(){
  "use strict";

  var request = require('request');
  var validator = require('validator');
  var sanitize = validator.sanitize;
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
  WorldCat.prototype.classify = function(title, callback) {
    title = sanitize(title).str;

    var maxRecs = 1;
    var summary = "true";
    var url = "http://classify.oclc.org/classify2/Classify?" +
              "title=" + title + "&summary=" + summary + "&maxRecs=" + maxRecs;

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
        console.log("There has been an error");
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

    request.get(url, rcallback);
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
    byNumber : function(worldCatId, callback) {
      var url = "http://experimental.worldcat.org/recommender/MLT/" + worldCatId;
      
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
          console.log("There has been an error");
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
          
            var code = result.mlt.response[0].$.code;
          
            if (code in codes.good) {
              var list = result.mlt.likeItems[0].likeItem;
              callback(null, list);
            }
            else {
              var serviceError = 'Service error: ' + codes.bad.code;
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
    byTitle : function(title, callback) {
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
          WorldCat.prototype.recommend.byNumber(result, numCallback);
        }
      };

      WorldCat.prototype.classify(title, clasCallback);
    }
  };

  module.exports = WorldCat;
}());

