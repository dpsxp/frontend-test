var PersonView = require('../../public/javascripts/views/person_view');
var Person = require('../../public/javascripts/models/person_model');
var _ = require('underscore');

describe('PersonView', function () {
  var view = {};

  beforeEach(function () {
    view = new PersonView({ model: new Person() });
  });

  describe('#initialize', function () {
    it('initializes the tagName attribute with div', function () {
      expect(view.tagName).to.be.eql('div');
    });

    it('initializes the className with person', function () {
      expect(view.className).to.be.eql('person');
    });

    it('throws a error if no model is given', function() {
      var createView = function () {
        view = new PersonView();
      };

      expect(createView).to.throw(/Missing Model for Person View/);
    });
  });

  describe('#render', function () {
    it('sets the element html based on template attribute and the current model', function () {
      var model = new Person({ name: 'pikaboo' });
      var template = _.template('<p><%= name %></p>');
      var view = new PersonView({ model: model, template: template });
      view.render();
      expect(view.$el.html()).to.be.eql('<p>pikaboo</p>');
    });

    it('returns the itself, to allow chain', function () {
      expect(view.render()).to.be.eql(view);
    });
  });
});
