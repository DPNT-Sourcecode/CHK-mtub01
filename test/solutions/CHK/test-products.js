var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const products = require('../../../lib/solutions/CHK/products');

describe('Checkout Challenge: Get Product List', function() {
	it('should return all products', function() {
		const productDetails=products.all()
	    assert.equal(productDetails.length, 4);
	});
});