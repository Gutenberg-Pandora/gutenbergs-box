module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting up the "To Read" routes
    app.get('/users/me/toread',auth.requiresLogin, users.getBooks);
    app.put('/users/me/toread/:bookId',auth.requiresLogin, users.addBook);
    app.del('/users/me/toread/:bookId',auth.requiresLogin, users.removeBook);

    //Setting up the Shelf routes
    app.get('/users/me/shelf',auth.requiresLogin, users.getShelves);

    app.get('/users/me/shelf/:shelfId',auth.requiresLogin, users.getShelf);
    app.put('/users/me/shelf/:title',auth.requiresLogin, users.createShelf);
    app.del('/users/me/shelf/:shelfId',auth.requiresLogin, users.removeShelf);

    app.get('/users/me/shelf/:shelfId/like',auth.requiresLogin, users.getLike);
    app.put('/users/me/shelf/:shelfId/like/:bookId',auth.requiresLogin, users.addLike);
    app.del('/users/me/shelf/:shelfId/like/:bookId',auth.requiresLogin, users.removeLike);

    app.get('/users/me/shelf/:shelfId/dislike',auth.requiresLogin, users.getDislike);
    app.put('/users/me/shelf/:shelfId/dislike/:bookId',auth.requiresLogin, users.addDislike);
    app.del('/users/me/shelf/:shelfId/dislike/:bookId',auth.requiresLogin, users.removeDislike);


    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);
    app.param('bookId', users.bookId);
    app.param('title', users.title);
    app.param('shelfId', users.shelfId);

    //WorldCat Routes
    var WorldCat = require('../app/controllers/worldcat');
    app.get('/recommend', function(req, res) {
        console.log(req.query);
        var title = req.query.title;
        var wc = new WorldCat();
        var less = true;
        
        wc.recommend.byTitle(title, function (err, result) {
            if (err) {
                res.jsonp(404);
            }
            else {
                res.jsonp(result);
            }
        }, less);
    });

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
