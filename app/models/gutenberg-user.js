/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Gutenberg-User Schema
 */
var GutenbergUserSchema = new Schema({
    username: String,
    password: String,
    readingQueue: [String],
    boxes: [{
        title: String,
        liked: [String],
        disliked: [String]
    }]
});

/**
 * Validations
 */
GutenbergUserSchema.path('username').validate(function(username) {
    return username.length;
}, 'Username cannot be blank');

GutenbergUserSchema.path('password').validate(function(hashed_password) {
    return hashed_password.length;
}, 'Password cannot be blank');

mongoose.model('Gutenberg-User', GutenbergUserSchema);
