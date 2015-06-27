var $ = require('jquery');
var PeopleCollecion = require('./collections/people_collection');
var PersonView = require('./views/person_view');

window._ = require('underscore');

window.App = {
  init: function (wrapper) {
    this.$wrapper = $(wrapper || '#app');
    this.collection = new PeopleCollecion();
    this.childrenViews  = [];
    this.listenToFetch();
  },

  listenToFetch : function () {
    this.collection.on('reset', this.afterFetch.bind(this));
  },

  removeZombieViews: function () {
    this.childrenViews.map( (view) => view.remove() );
  },

  afterFetch : function (models) {
    this.removeZombieViews();
    this.renderViews(models);
  },

  renderViews: function (models) {
    var html = this.collection.map((model) => {
      var view = new PersonView({ model: model });
      this.childrenViews.push(view);
      return view.render().$el.html();
    });
    this.$wrapper.html(html);
  },

  fetch: function () {
    this.collection.fetch({ reset: true });
  }
};

App.init();
App.fetch();
