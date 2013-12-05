/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('underscore');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            return res.render('users/signup', {
                errors: err.errors,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 *  Show profile
 */
exports.show = function(req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

/**
 * Set bookId param
 */
exports.bookId = function(req, res, next, id) {
    req.bookId = id;
    next();
};

/**
 *  Add book to reading queue
 */
exports.addBook = function(req, res) {
    var bookId = req.bookId;
    var user = req.user;
    var readingQueue = user.readingQueue;

    readingQueue.push(bookId);
    readingQueue = _.extend(user.readingQueue, readingQueue);

    User.update({_id: user._id},{$set: {readingQueue: readingQueue}}, function(err){
        res.jsonp(user);
    });
};

/**
 *  Remove book from reading queue
 */
exports.removeBook = function(req, res) {
    var bookId = req.bookId;
    var user = req.user;
    var readingQueue = user.readingQueue;

    var index = readingQueue.indexOf(bookId);
    if(index > -1){
        readingQueue.splice(index,1);
    }
    readingQueue = _.extend(user.readingQueue, readingQueue);

    User.update({_id: user._id},{$set: {readingQueue: readingQueue}}, function(err){
        res.jsonp(user);
    });
};

/**
 *  Get all books in reading queue
 */
exports.getBooks = function(req, res) {
    var user = req.user;
    res.jsonp(user.readingQueue);
};







