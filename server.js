// First, we establish a full closure to prevent leaking local variables
// into the global namespace.
(function(){
  // Javascript becomes hard to read and hard to understand in bulk when
  // this item is omitted.
  "use strict";

  var Express = require('express')
    , app = new Express()
    , DatabaseAccess = require('./server/databaseaccess')
    , db = new DatabaseAccess()
    , port
    , fakeUserDb
    ;

  // I like to keep function declarations at the top of their scope, as that's
  // where Javascript interprets them anyhow.
  // Handle possibly-problematic DB calls
  function dbQueryResponder(err, result) {
    if(err) {
      res.send(404);
    } else {
      res.json(result);
    }
  };

  if (process.argv[2]) {
    port = parseInt(process.argv[2]);
  } else {
    port = 3000;
  }

  fakeUserDb = {
    bob: {
      username: "bob",
      password: "fred",
      readingQueue: [
        "lccn-n85-221132",
        "144221380"
      ],
      boxes: {
        fantasy: {
          liked: [
            "42363969"
          ],
          disliked: [
            "61147491"
          ]
        }
      }
    }
  };

  // it is handy to serve .ejs files as text/html files.
  Express.static.mime.define({'text/html': ['ejs']});

  // Set up middleware and routes for use
  app.use(Express.logger());
  app.get("/", function(req, res) {
    res.redirect("/views/index.html");
  });
  app.get("/users", function(req, res) {
    res.json(Object.keys(fakeUserDb));
  });
  app.get("/users/:username", function(req, res) {
    var username = req.params.username;

    db.isUser(username, dbQueryResponder);
  });
  app.get("/users/:username/boxes", function(req, res) {
    var username = req.params.username
      ;

    if (username && username in fakeUserDb) {
      res.json(Object.keys(fakeUserDb[username].boxes || {}));
    } else {
      res.send(404);
    }
  });
  app.get("/users/:username/boxes/:boxname", function(req, res) {
    var user = req.params.username
      , userObj
      , box = req.params.boxname
      , boxObj
      ;

    // validate user
    if (user && // user isn't an empty string or undefined (unnecessary?)
        user in fakeUserDb && // user exists
        fakeUserDb[user] && // user's entry is an object
        fakeUserDb[user].boxes && // user has boxes object
        box in fakeUserDb[user].boxes // box exists
        )
    {
      res.json(fakeUserDb[user].boxes[box]);
    } else {
      res.send(404);
    }
  });
  app.use(Express.static(__dirname + '/public'));

  app.listen(parseInt(port));
  console.log("listening on port", port);
// This function with its own little closure is then executed with this file
// is run.
})();
