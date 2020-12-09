var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('Checkout Challenge: calculate checkout amount', function() {
	it('should return 0, if empty string or null', function() {
	    assert.equal(checkout(''), 0);
	});
	it('should return 20, if C in inputString', function() {
	    assert.equal(checkout('C'), 20);
	});
	it('should return 70, if AC in inputString', function() {
	    assert.equal(checkout('AC'), 70);
	});
	it('should return -1, if AM in inputString', function() {
	    assert.equal(checkout('AM'), -1);
	});
	it('should return -1, if AxA in inputString', function() {
	    assert.equal(checkout('AxA'), -1);
	});

	it('should return -1, if AAA in inputString', function() {
	    assert.equal(checkout('AAA'), 130);
	});
	it('should return 330, if 8A (3A for 130, 5A for 200) in inputString', function() {
	    assert.equal(checkout('AAAAAAAA'), 330);
	});
});