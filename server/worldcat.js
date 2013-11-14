(function(){
  "use strict";

  var request = require('request');

  function WorldCat(apiKey) {
    if (!this instanceof WorldCat) {
      return new WorldCat(apiKey);
    }

    this.apiKey = apiKey;
  }
  WorldCat.prototype.recommend = function(worldCatId, callback) {
    request("http://worlcat.org/apithingamajig/"+worldCatId).when(function(result) {
      callback(null, result);
    });
  }
  
  module.exports = WorldCat;
}());

