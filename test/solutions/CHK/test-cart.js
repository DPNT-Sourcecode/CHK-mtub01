var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const cart = require('../../../lib/solutions/CHK/cart');

describe('Checkout Challenge: add to cart', function() {
	it('should return 1 for SKU A', function() {
		const product={sku:'A',price:'50'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product)
		const productsInCart=cartObj.getCartItems()
		assert.equal(productsInCart.length, 1);
		assert.equal(productsInCart[0].quantity, 1);
		assert.equal(productsInCart[0].product.sku, product.sku);
	});
});