(function(){
  "use strict";

  var mongoose = require( 'mongoose' );

  //Connection string
  var dbURI = 'mongodb://localhost/test';

  //Create db connection
  mongoose.connect(dbURI);


  // CONNECTION EVENTS
  //Success
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
  });

  //Error
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  //Disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  //Node process ends
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });


  //Importing the schemas and models
}());