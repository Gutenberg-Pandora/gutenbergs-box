(function(){
	"use strict";
	var mongoose = require( 'mongoose' ),
	models = require('./models'),
	userModel = mongoose.model('User'),
	boxModel = mongoose.model('Box'),
	bookshelfModel = mongoose.model('Bookshelf');


	/**
	* DatabaseAccess
	*
	* Constructor for this module.
	*/
	function DatabaseAccess(){
	}

	/**
 	* addUser
	*
	* Adds a new user document to the database,
	* creates and adds corresponding box and bookshelf documents
	*
	* @param username
	* @param password
	*/
	DatabaseAccess.prototype.addUser = function(username, password){
		var emptyArray = {};

		var original_id = mongoose.Types.ObjectId();

		//add new user document to database
		userModel.create({
			_id: original_id,
		    Username : username,
		    Pass: password,
		});

		//create a bookshelf for user
		bookshelfModel.create({
			UserId: original_id,
			Books: emptyArray
		});
	};


	/**
 	* addBox
	*
	* Adds a new box for user
	*
	* @param username
	* @param title
	*/
	DatabaseAccess.prototype.addBox = function(username, title){
		var emptyArray = {};

		//find _id of user and create box
		userModel.findOne({ 'Username': username }, '_id', function (err, user) {
			if(user != null){
	  			var userID = user._id;

	  			//create a box
				boxModel.create({
					UserId: userID,
					Title: title,
					badBooks: emptyArray,
					goodBooks: emptyArray
				});
			}
			else{
				//ERROR THERE WAS NO USER WITH THAT USERNAME
			}
		});
	};

  module.exports = DatabaseAccess;

}());