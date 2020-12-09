var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const cart = require('../../../lib/solutions/CHK/cart');

describe('Checkout Challenge: add to cart', function() {
	it('should return 1 for SKU A', function() {
		const product={sku:'A',price:'50'}
		const skulist='A'
		const cartObj=new cart.Cart()
	    assert.equal(checkout(''), 0);
	});
});