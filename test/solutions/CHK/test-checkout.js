var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('Checkout Challenge: calculate checkout amount', function() {
	it('should return -1, if empty string or null', function() {
	    assert.equal(checkout(''), -1);
	});
	it('should return 20, if C in inputString', function() {
	    assert.equal(checkout('C'), -1);
	});
});