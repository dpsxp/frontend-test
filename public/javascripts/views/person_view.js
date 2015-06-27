var PersonModel = require('../models/person_model.js');
var Backbone = require('backbone');
var View = Backbone.View;
var _ = require('underscore');

class PersonView extends View {
  constructor(options) {
    if (!options.model) {
      throw new Error('Missing Model for Person View');
    }

    super(options);
    this.tagName = 'div';
    this.className = 'person';

    if (!options.template) {
      let text = Backbone.$('#person-template').text();
      this.template = _.template(text);
    }
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
}

module.exports = PersonView;
