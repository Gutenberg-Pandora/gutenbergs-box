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

  // it is handy to serve .ejs files as text/html files.
  Express.static.mime.define({'text/html': ['ejs']});

  // Set up middleware and routes for use
  app.use(Express.logger());
  app.get("/", function(req, res) {
    res.redirect("/views/index.html");
  });
  app.use(Express.static(__dirname + '/public'));

  app.listen(parseInt(port));
  console.log("listening on port", port);
// This function with its own little closure is then executed with this file
// is run.
})();
