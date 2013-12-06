/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('Gutenberg-User');

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    user.save();
    res.jsonp(user);
};

/**
* Get all boxes for user
*/
exports.getBoxes = function(req, res) {
	var username = req.params.username;
	User.findOne({ 'username': username}, 'boxes', function (err, boxes) {
		if(boxes !== null){
			res.jsonp(boxes);
		}
		else{
			res.jsonp({});
		}
	});
};