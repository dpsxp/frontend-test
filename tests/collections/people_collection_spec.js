var PeopleCollection = require('../../public/javascripts/collections/people_collection');
var PersonModel = require('../../public/javascripts/models/person_model');
var sinon = require('sinon');

describe('PeopleCollection', function () {
  var collection = {};

  beforeEach(function() {
    collection = new PeopleCollection();
  });

  describe('properties', function () {
    describe('url', function () {
      it('should be equal to /fazenda.json', function () {
        expect(collection.url).to.be.eql('/fazenda.json');
      });
    });

    describe('model', function () {
      it('shoud be equal to Person model', function () {
        expect(collection.model).to.be.eql(PersonModel);
      });
    });
  });

  describe('#comparator', function () {
    var likeFunction = function (value) {
      return function (name) {
        if (name === 'likes') {
          return value;
        }
      };
    };

    it('sort by likes properties on desc order', function () {
      var models = [];
      var fakeModel = { get: likeFunction(32) };
      var otherModel = { get: likeFunction(75) };
      models.push(fakeModel);
      models.push(otherModel);
      models.sort(collection.comparator);
      expect(models[0]).to.be.eql(otherModel);
    });
  });

  describe('#parse', function() {
    var server = {};
    beforeEach(function () {
      server = sinon.fakeServer.create();
    });

    afterEach( function() {
      server.restore();
    });

    it('returns the data key from response', function() {
      var fakeModel = { name: 'Testando' };
      var response = JSON.stringify({ data: [ fakeModel ] });
      server.respondWith('/fazenda.json', [200, { 'Content-Type' : 'application/json' }, response ]);

      collection.fetch({ reset: true });
      server.respond();
      expect(collection.models.length).to.be.eql(1);
      expect(collection.models[0].get('name')).to.be.eql(fakeModel.name);
    });
  });
});

