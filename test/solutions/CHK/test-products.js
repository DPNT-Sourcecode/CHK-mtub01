var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const products = require('../../../lib/solutions/CHK/products');

describe('Checkout Challenge: Get Product List', function() {
	it('should be able to add products', function() {
		const productList=new products.Products()
		productList.add('newProduct')
		assert.equal(productList.products[0], 'newProduct');
	});
	// it('should return all products', function() {
	// 	const productDetails=products.all()
	//     assert.equal(productDetails.length, 4);
	// });
});