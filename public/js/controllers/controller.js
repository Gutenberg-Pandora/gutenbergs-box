GutenbergsBox.ApplicationController = Ember.Controller.extend();

GutenbergsBox.BookshelfController = Ember.ArrayController.createWithMixins({
    content: [],
    addItem: function(item) {
        this.addObject(item);
    }
});

GutenbergsBox.selectedUserController = Ember.ObjectController.createWithMixins({
	selectedUser: [],
	select: function(item) {
		this.set('selectedUser', item);
	}
});

GutenbergsBox.selectedUserController = Ember.ObjectController.extend({
	actions: {
    addBox: function() {
      
    },

    removeBox: function() {
      
    }
  }
});

GutenbergsBox.selectedBoxController = Ember.ObjectController.createWithMixins({
	selectedBox: [],
	select: function(item) {
		this.set('selectedBox', item);
	}
});

GutenbergsBox.selectedBookController = Ember.ObjectController.createWithMixins({
	selectedBook: [],
	select: function(item) {
		this.set('selectedBook', item);
	}
});
