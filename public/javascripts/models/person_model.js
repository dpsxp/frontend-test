var { Model } = require('backbone');

class Person extends Model {
  get defaults () {
    return {
      positive: 0,
      negative: 0
    };
  }

  initialize() {
    this.setLikes();
    this.setNegatives();
  }

  setNegatives () {
    this.set('dislikes', this._getPercentage('negative'));
  }

  setLikes() {
    this.set('likes', this._getPercentage('positive'));
  }

  _getTotal() {
    return window.parseInt(this.get('positive')) + window.parseInt(this.get('negative'));
  }

  _getPercentage (prop) {
    var total, calc, result;
    total = this._getTotal();
    calc = window.parseInt(this.get(prop));

    if (calc > 0) {
      result =  (calc * 100) / total;
    } else {
      result = 0;
    }
    return result;
  }
}

module.exports = Person;
