(function(){
	"use strict";
	var mongoose = require( 'mongoose' );


	/**
	* DatabaseAccess
	*
	* Constructor for this module.
	*/
	function DatabaseAccess(){
		//User
		var userSchema = new mongoose.Schema({
      		username: String,
      		password: String,
      		readingQueue: [String],
      		boxes: [{
      			title: String,
          		liked: [String],
          		disliked: [String]
      		}]
		});

		this.User = mongoose.model('User', userSchema);
	}

	/**
 	* isUser
	*
	* Checks databse for user with the given username
	*
	* @param username
	* @return username if exists, null if user does not exist
	*/
	DatabaseAccess.prototype.isUser = function(username, callback){
		this.User.findOne({ 'username': username}, 'username', function (err, user) {
			if(user != null){
				callback(null, user.username);
	  			return user.username;
			}
			else{
				callback("404", null);
				return "404";
			}
		});
	};

  module.exports = DatabaseAccess;

}());