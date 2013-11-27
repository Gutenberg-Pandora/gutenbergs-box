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