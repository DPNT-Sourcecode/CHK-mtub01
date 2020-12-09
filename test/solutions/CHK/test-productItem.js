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
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer,null)
	});
	it('should init a productItem Object with only price , sku and offer', function() {
		const sku='A'
		const price=50
		const offer='3A for 130'
		const product=new productItem.ProductItem(sku,price,offer)
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer,offer)
	});
	it('should create reduction object for product offer', function() {
		const sku='A'
		const price=50
		const offer='3A for 130'
		const product=new productItem.ProductItem(sku,price,offer)
		const expectedReduction={
			perPrice:130/3,
			quantity:3,
			totalPrice:130
		}
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer,offer)
		assert.notEqual(product.reduction,null)
		assert.equal(product.reduction.perPrice,expectedReduction.perPrice)
		assert.equal(product.reduction.quantity,expectedReduction.quantity)
		assert.equal(product.reduction.totalPrice,expectedReduction.totalPrice)
	});
});