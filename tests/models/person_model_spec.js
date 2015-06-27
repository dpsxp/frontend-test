var expect = require('chai').expect;
var PersonModel = require('../../public/javascripts/models/person_model');
var fixture = require('../fixtures/person.json');

describe('PersonModel', function () {
  it('sets the dislikes attribute after initialize', function () {
    var person = new PersonModel(fixture);
    expect(person.get('dislikes')).to.not.be.undefined;
  });

  it('sets the likes attribute after initialize', function () {
    var person = new PersonModel(fixture);
    expect(person.get('likes')).to.not.be.undefined;
  });

  describe('#defaults', function () {
    it('returns the defaults properties', function () {
      var person = new PersonModel(fixture);
      expect(person.defaults).to.be.eql({ positive: 0, negative: 0 });
    });
  });

  describe('#setLikes', function () {
    var data = {};

    beforeEach(function() {
      data = Object.create(fixture);
    });

    it('calculates de likes percentage basend on positive and negative', function () {
      data.positive = 30;
      data.negative = 30;
      var person = new PersonModel(data);
      person.setLikes();
      expect(person.get('likes')).to.be.eql(50);
    });

    it('sets the likes to 0 when the positive attribute is 0', function () {
      data.positive = 0;
      var person = new PersonModel(data);
      person.setLikes();
      expect(person.get('likes')).to.be.eql(0);
    });
  });

  describe('#setDislikes', function () {
    var data = {};

    beforeEach(function () {
      data = Object.create(fixture);
    });

    it('calculates de dislikes percentage basend on positive and negative', function () {
      data.positive = 30;
      data.negative = 30;
      var person = new PersonModel(data);
      person.setDislikes();
      expect(person.get('dislikes')).to.be.eql(50);
    });

    it('sets the dislikes to 0 when the negative attribute is 0', function () {
      data.negative = 0;
      var person = new PersonModel(data);
      person.setDislikes();
      expect(person.get('dislikes')).to.be.eql(0);
    });
  });
});
