var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const cart = require('../../../lib/solutions/CHK/cart');

describe('Checkout Challenge: calculate checkout amount', function() {
	it('should return 0, if empty string or null', function() {
	    assert.equal(checkout(''), 0);
	});
});