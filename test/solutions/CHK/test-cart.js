var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const cart = require('../../../lib/solutions/CHK/cart');

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
		const Stock = require('../../../lib/solutions/CHK/stock').Stock
		const bProduct=Stock.get('B')
		const eProduct=Stock.get('E')
		const cartObj=new cart.Cart()
		cartObj.addToCart(bProduct,5)
		cartObj.addToCart(eProduct,2)
		const normalized=cartObj.getNormalizedCartItem()
		const productsInCart=cartObj.getItemSku(bProduct.sku)
		const productECart=cartObj.getItemSku(eProduct.sku)
		assert.equal(productsInCart.quantity, 4);
		assert.equal(productECart.quantity, 0);
	});
	it('should return 3 for SKU B and 1 for E after normalized', function() {
		const Stock = require('../../../lib/solutions/CHK/stock').Stock
		const bProduct=Stock.get('B')
		const eProduct=Stock.get('E')
		const cartObj=new cart.Cart()
		cartObj.addToCart(bProduct,5)
		cartObj.addToCart(eProduct,5)
		const normalized=cartObj.getNormalizedCartItem()
		const productsInCart=cartObj.getItemSku(bProduct.sku)
		const productECart=cartObj.getItemSku(eProduct.sku)
		assert.equal(productsInCart.quantity, 3);
		assert.equal(productECart.quantity, 1);
	});
	it('should return copy of cart', function() {
		const Stock = require('../../../lib/solutions/CHK/stock').Stock
		const bProduct=Stock.get('B')
		const eProduct=Stock.get('E')
		const cartObj=new cart.Cart()
		cartObj.addToCart(bProduct,5)
		cartObj.addToCart(eProduct,5)
		const newCartObj=new cart.Cart()
		newCartObj.setProducts(cartObj.getCartItems())
		newCartObj.getNormalizedCartItem()
		const productBCartNew=newCartObj.getItemSku(bProduct.sku)
		const productBCart=cartObj.getItemSku(eProduct.sku)
		assert.notEqual(productBCartNew.quantity,productBCart.quantity)
		
	});
	it('should be proper for buy any', function() {
		const Stock = require('../../../lib/solutions/CHK/stock').Stock
		const skus=['S','T','X','Y','Z']
		const cartObj=new cart.Cart()
		skus.forEach((sku)=>{
			const product=Stock.get(sku)
			cartObj.addToCart(product,2)
		})
		
		const newCartObj=new cart.Cart()
		newCartObj.setProducts(cartObj.getCartItems())
		newCartObj.getNormalizedCartItem()
		const productXCartNew=newCartObj.getItemSku('X')
		const productXCart=cartObj.getItemSku('X')
		assert.notEqual(productXCartNew.quantity,productXCart.quantity)
		console.log(newCartObj)
		assert.equal(productXCartNew.quantity,1)
		
	});
});