var { Collection } = require('backbone');
var Person = require('../models/person_model');

class PeopleCollecion  extends Collection {
  initialize() {
    this.model = Person;
    this.url = '/fazenda.json';
  }

  comparator (b, a) {
    return a.get('likes') > b.get('likes') ? 1 : -1;
  }

  parse (response) {
    return response.data;
  }
}

module.exports = PeopleCollecion;
