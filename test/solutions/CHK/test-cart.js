var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const cart = require('../../../lib/solutions/CHK/cart');
const Stock = require('../../../lib/solutions/CHK/stock').Stock
describe('Checkout Challenge: add to cart', function() {
	it('should return 1 for SKU A add', function() {
		const product={sku:'A',price:'50'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product)
		const productsInCart=cartObj.getCartItems()
		assert.equal(productsInCart.length, 1);
		assert.equal(productsInCart[0].quantity, 1);
		assert.equal(productsInCart[0].product.sku, product.sku);
	});
	it('should return 2 for SKU A add', function() {
		const product={sku:'A',price:'50'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product)
		cartObj.addToCart(product)
		const productsInCart=cartObj.getCartItems()
		assert.equal(productsInCart.length, 1);
		assert.equal(productsInCart[0].quantity, 2);
		assert.equal(productsInCart[0].product.sku, product.sku);
	});
	it('should return 5 for SKU A add quantity', function() {
		const product={sku:'A',price:'50'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product,5)
		const productsInCart=cartObj.getCartItems()
		assert.equal(productsInCart.length, 1);
		assert.equal(productsInCart[0].quantity, 5);
		assert.equal(productsInCart[0].product.sku, product.sku);
	});
	it('should return 4 for SKU A after remove cart', function() {
		const product={sku:'A',price:'50'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product,5)
		cartObj.removeFromCart(product,1)
		const productsInCart=cartObj.getCartItems()
		assert.equal(productsInCart.length, 1);
		assert.equal(productsInCart[0].quantity, 4);
		assert.equal(productsInCart[0].product.sku, product.sku);
	});
	it('should return null for SKU A after remove cart', function() {
		const product={sku:'A',price:'50'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product,5)
		cartObj.removeFromCart(product,5)
		const productsInCart=cartObj.getCartItems()
		assert.equal(productsInCart.length, 0);
	});
	it('should return 2 for SKU B after get item', function() {
		const product={sku:'A',price:'50'}
		const product2={sku:'B',price:'30'}
		const cartObj=new cart.Cart()
		cartObj.addToCart(product,5)
		cartObj.addToCart(product2,2)
		const productsInCart=cartObj.getItemSku(product2.sku)
		assert.equal(productsInCart.quantity, 2);
	});
	it('should return 4 for SKU B after normalized', function() {
		const bProduct=Stock.get('B')
		const eProduct=Stock.get('E')
		const cartObj=new cart.Cart()
		cartObj.addToCart(bProduct,5)
		cartObj.addToCart(eProduct,2)
		cartObj.getNormalizedCartItem()
		const productsInCart=cartObj.getItemSku(bProduct.sku)
		assert.equal(productsInCart.quantity, 4);
	});
});
