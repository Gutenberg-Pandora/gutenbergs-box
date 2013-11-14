GutenbergsBox.User = Ember.Object.extend({
	username: null,
	password: null,
	boxes: null, //list of Boxes (stations)
	bookshelf: null //a bookshelf object specific to the User
});
	
GutenbergsBox.Box = Ember.Object.extend({
	title: null, // title of the Box(Station)
	badBooks: null, //books the user disliked
	goodBooks: null //books the user liked
});

GutenbergsBox.Bookshelf = Ember.Object.extend({
    books: null //list of books on the bookshelf
});

GutenbergsBox.Book = Ember.Object.extend({
	title: null,
	author: null,
	content: null,
	downloadLinks: null
});

GutenbergsBox.DownloadLink = Ember.Object.extend({
    link: null, //list of books on the bookshelf
	title: null
});