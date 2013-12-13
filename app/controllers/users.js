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
 * Set shelfId param
 */
exports.shelfId = function(req, res, next, id) {
    req.shelfId = id;
    next();
};

/**
 * Set title param
 */
exports.title = function(req, res, next, title) {
    req.title = title;
    next();
};

/**
 * Set title param
 */
exports.swid = function(req, res, next, swid) {
    req.swid = swid;
    next();
};

/**
 * Show login form
 */
exports.searchModal = function(req, res) {
    res.render('users/search', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
* Get all shelves
*/
exports.getShelves = function(req, res) {
    var user = req.user;
    res.jsonp(user.shelves);
};

/**
* Get shelf
*/
exports.getShelf = function(req, res) {
    var shelfId = req.shelfId;
    var user = req.user;

    var index = indexOf(user.shelves, shelfId, 'id');

    if(index > -1){
        res.jsonp(user.shelves[index]);
    }
    else{
        res.jsonp("Shelf does not exist");
    }
};

/**
* Create new shelf
*/
exports.createShelf = function(req, res) {
    var user = req.user;
    //var bookId = req.bookId;
    var shelves = user.shelves;
    var title = req.title;
    var swid = req.swid;
    var newShelf = {
        title: title,
        like: [swid],
        dislike:[]
    };

    shelves.push(newShelf);

    User.update({_id: user._id},{$set: {shelves: shelves}}, function(err){
        res.jsonp(shelves[shelves.length-1]);
    });
};

/**
 *  Remove shelf
 */
exports.removeShelf = function(req, res) {
    var shelfId = req.shelfId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        shelves.splice(index,1);
    }

    User.update({_id: user._id},{$set: {shelves: shelves}}, function(err){
        res.jsonp(user.shelves);
    });
};

/**
* Get shelf like list
*/
exports.getLike = function(req, res) {
    var shelfId = req.shelfId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        res.jsonp(shelves[index].like);
    }
    else{
        res.jsonp("Shelf does not exist");
    }
};

/**
* Add book to like list
*/
exports.addLike = function(req, res) {
    var shelfId = req.shelfId;
    var bookId = req.bookId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        var shelf = shelves[index];
        shelf.like.push(bookId);
        shelves[index] = shelf;
    }

    User.update({_id: user._id},{$set: {shelves: shelves}}, function(err){
        res.jsonp(user.shelves[index].like);
    });
};

/**
* Remove book from like list
*/
exports.removeLike = function(req, res) {
    var shelfId = req.shelfId;
    var bookId = req.bookId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        var shelf = shelves[index];
        var bookIndex = shelf.like.indexOf(bookId);
        if(bookIndex > -1){
            shelf.like.splice(bookIndex,1);
        }
    }

    User.update({_id: user._id},{$set: {shelves: shelves}}, function(err){
        res.jsonp(user.shelves[index].like);
    });
};

/**
* Get shelf dislike list
*/
exports.getDislike = function(req, res) {
    var shelfId = req.shelfId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        res.jsonp(shelves[index].dislike);
    }
    else{
        res.jsonp("Shelf does not exist");
    }
};

/**
* Add book to dislike list
*/
exports.addDislike = function(req, res) {
    var shelfId = req.shelfId;
    var bookId = req.bookId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        var shelf = shelves[index];
        shelf.dislike.push(bookId);
        shelves[index] = shelf;
    }

    User.update({_id: user._id},{$set: {shelves: shelves}}, function(err){
        res.jsonp(user.shelves[index].dislike);
    });
};

/**
* Remove book from dislike list
*/
exports.removeDislike = function(req, res) {
    var shelfId = req.shelfId;
    var bookId = req.bookId;
    var user = req.user;
    var shelves = user.shelves;

    var index = indexOf(shelves, shelfId, 'id');

    if(index > -1){
        var shelf = shelves[index];
        var bookIndex = shelf.dislike.indexOf(bookId);
        if(bookIndex > -1){
            shelf.dislike.splice(bookIndex,1);
        }
    }

    User.update({_id: user._id},{$set: {shelves: shelves}}, function(err){
        res.jsonp(user.shelves[index].dislike);
    });
};

/**
* Index of function
*/
indexOf = function(myArray, searchTerm, property){
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
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

    User.update({_id: user._id},{$set: {readingQueue: readingQueue}}, function(err){
        res.jsonp(user.readingQueue);
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

    User.update({_id: user._id},{$set: {readingQueue: readingQueue}}, function(err){
        res.jsonp(user.readingQueue);
    });
};

/**
 *  Get all books in reading queue
 */
exports.getBooks = function(req, res) {
    var user = req.user;
    res.jsonp(user.readingQueue);
};
