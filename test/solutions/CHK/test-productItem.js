var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const productItem = require('../../../lib/solutions/CHK/productItem');

describe('Checkout Challenge: Product Item', function() {
	it('should init a productItem Object with only price and sku', function() {
		const sku='A'
		const price=50
		const product=new productItem.ProductItem(sku,price)
		productList.add('newProduct')
		assert.equal(productList.products[0], 'newProduct');
	});
});