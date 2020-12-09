var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const productItem = require('../../../lib/solutions/CHK/productItem');

describe('Checkout Challenge: Product Item', function () {
	it('should init a productItem Object with only price and sku', function () {
		const sku = 'A'
		const price = 50
		const product = new productItem.ProductItem(sku, price)
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, null)
	});
	it('should init a productItem Object with only price , sku and offer', function () {
		const sku = 'A'
		const price = 50
		const offer = '3A for 130'
		const product = new productItem.ProductItem(sku, price, offer)
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
	});
	it('should create reduction object for product offer', function () {
		const sku = 'A'
		const price = 50
		const offer = '3A for 130'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = {
			perPrice: 130 / 3,
			quantity: 3,
			totalPrice: 130
		}
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)
		assert.equal(product.reduction[0].perPrice, expectedReduction.perPrice)
		assert.equal(product.reduction[0].quantity, expectedReduction.quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction.totalPrice)
	});
	it('should create reduction object with perPrice:35 totalPrice:140 quantity:4', function () {
		const sku = 'B'
		const price = 50
		const offer = '4B for 140'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = {
			perPrice: 140 / 4,
			quantity: 4,
			totalPrice: 140
		}
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)
		assert.equal(product.reduction[0].perPrice, expectedReduction.perPrice)
		assert.equal(product.reduction[0].quantity, expectedReduction.quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction.totalPrice)
	});
	it('should create multiple reduction object for product offer', function () {
		const sku = 'A'
		const price = 50
		const offer = '3A for 130, 5A for 200'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = [
			{
				perPrice: 200 / 5,
				quantity: 5,
				totalPrice: 200
			}, {
				perPrice: 130 / 3,
				quantity: 3,
				totalPrice: 130
			}
		]
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)
		assert.equal(product.reduction[0].perPrice, expectedReduction[0].perPrice)
		assert.equal(product.reduction[0].quantity, expectedReduction[0].quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction[0].totalPrice)
		assert.equal(product.reduction[1].perPrice, expectedReduction[1].perPrice)
		assert.equal(product.reduction[1].quantity, expectedReduction[1].quantity)
		assert.equal(product.reduction[1].totalPrice, expectedReduction[1].totalPrice)
	});
	it('should create reduction object with freeItem, 2E get one B free', function () {
		const sku = 'E'
		const price = 40
		const offer = '2E get one B free'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = {
			quantity: 2,
			totalPrice: price * 2,
			free: { sku: 'B', quantity: 1 }
		}
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)

		assert.equal(product.reduction[0].quantity, expectedReduction.quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction.totalPrice)
		assert.notEqual(product.reduction[0].free, null)
		assert.equal(product.reduction[0].free.quantity, expectedReduction.free.quantity)
		assert.equal(product.reduction[0].free.sku, expectedReduction.free.sku)
	});
	it('should create multiple reduction object for product offer free and multipack mix', function () {
		const sku = 'A'
		const price = 50
		const offer = '3A for 130, 2A get one B free'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = [
			{
				perPrice: 130 / 3,
				quantity: 3,
				totalPrice: 130
			}, {
				quantity: 2,
				totalPrice: price * 2,
				free: { sku: 'B', quantity: 1 }
			}
		]
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)
		assert.equal(product.reduction[0].perPrice, expectedReduction[0].perPrice)
		assert.equal(product.reduction[0].quantity, expectedReduction[0].quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction[0].totalPrice)
		assert.equal(product.reduction[1].quantity, expectedReduction[1].quantity)
		assert.equal(product.reduction[1].totalPrice, expectedReduction[1].totalPrice)
		assert.notEqual(product.reduction[1].free, null)
		assert.equal(product.reduction[1].free.quantity, expectedReduction[1].free.quantity)
		assert.equal(product.reduction[1].free.sku, expectedReduction[1].free.sku)
	});
	it('should create reduction object with freeItem, 2E get one E free', function () {
		const sku = 'E'
		const price = 40
		const offer = '2E get one E free'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = {
			perPrice: price*2 / 3,
			quantity: 3,
			totalPrice: price*2
		}
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)

		assert.equal(product.reduction[0].perPrice, expectedReduction.perPrice)
		assert.equal(product.reduction[0].quantity, expectedReduction.quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction.totalPrice)
	});
	it('should create reduction object with group, buy any 3 of (S,T,X,Y,Z) for 45', function () {
		const sku = 'S'
		const price = 40
		const offer = 'buy any 3 of (S,T,X,Y,Z) for 45'
		const product = new productItem.ProductItem(sku, price, offer)
		const expectedReduction = {
			group: "S,T,X,Y,Z".split(','),
			quantity: 3,
			totalPrice: 45
		}
		assert.equal(product.sku, sku);
		assert.equal(product.price, price);
		assert.equal(product.offer, offer)
		assert.notEqual(product.reduction, null)

		assert.equal(product.reduction[0].group.length, expectedReduction.group.length)
		assert.equal(product.reduction[0].quantity, expectedReduction.quantity)
		assert.equal(product.reduction[0].totalPrice, expectedReduction.totalPrice)
	});
});

