// First, we establish a full closure to prevent leaking local variables
// into the global namespace.
(function(){
  // Javascript becomes hard to read and hard to understand in bulk when
  // this item is omitted.
  "use strict";

  var Express = require('express')
    , app = new Express()
    , port
    ;

  if (process.argv[2]) {
    port = parseInt(process.argv[2]);
  } else {
    port = 3000;
  }
  console.log("listening on port", port);

  console.log("hello!");
  console.log("module:", require("./server/hello"));

  app.use(Express.static(__dirname + '/public'));
  app.get("/", function(req, res) {
    res.json(req.url);
  })

  app.listen(parseInt(port));
// This function with its own little closure is then executed with this file
// is run.
})();
