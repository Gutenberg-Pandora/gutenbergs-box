// First, we establish a full closure to prevent leaking local variables
// into the global namespace.
(function(){
  // Javascript becomes hard to read and hard to understand in bulk when
  // this item is omitted.
  "use strict";

  console.log("hello!");
  console.log("module:", require("./server/hello"));
// This function with its own little closure is then executed with this file
// is run.
})();
