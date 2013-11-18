(function(){
	"use strict";
	var mongoose = require( 'mongoose' );

	//User
	var userSchema = new mongoose.Schema({
	  Username: String,
	  Pass: String,
	  Boxes: Array,
	  Bookshelf: Array
	});

	var User = module.exports = mongoose.model('User', userSchema);

	//Box
	var boxSchema = new mongoose.Schema({
		UserId: mongoose.Schema.Types.ObjectId,
		Title: String,
		badBooks: Array,
		goodBooks: Array
	});

	var Box = module.exports = mongoose.model('Box', boxSchema);

	//Bookshelf
	var bookshelfSchema = new mongoose.Schema({
		UserId: mongoose.Schema.Types.ObjectId,
		Books: Array
	});

	var Bookshelf = module.exports = mongoose.model('Bookshelf', bookshelfSchema);
}());