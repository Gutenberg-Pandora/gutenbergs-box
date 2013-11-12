// First, we establish a full closure to prevent leaking local variables
// into the global namespace.
(function(){
  // Javascript becomes hard to read and hard to understand in bulk when
  // this item is omitted.
  "use strict";

  var Express = require('express')
    , app = new Express()
    ;

  console.log("hello!");
  console.log("module:", require("./server/hello"));

  app.use(Express.static(__dirname + '/public'));
  app.get("/", function(req, res) {
    res.json(req.url);
  })

  app.listen(3000);
// This function with its own little closure is then executed with this file
// is run.
})();
