var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const products = require('../../../lib/solutions/CHK/products');

describe('Checkout Challenge: Product List', function() {
	it('should be able to add products', function() {
		const productList=new products.Products()
		productList.add('newProduct')
		assert.equal(productList.products[0], 'newProduct');
	});
	it('should return all products', function() {
		const productItems=['A','B','C','D']
		const productList=new products.Products()
		productItems.forEach((p)=>{
			productList.add(p)
		})
		const productDetails=productList.all()
		assert.equal(productDetails.length, productItems.length);
		productDetails.forEach((data,i)=>{
			assert.equal(data,productItems[i]);
		})
	});
	it('should return product by sku', function() {
		const productItems=[{sku:'A',price:'20'},{sku:'B',price:'20'},{sku:'C',price:'20'}]
		const productList=new products.Products()
		productItems.forEach((p)=>{
			productList.add(p)
		})
		const productDetail=productList.get(productItems[0].sku)
		assert.equal(productDetail, productItems[0]);
	});
	it('should return null for no product', function() {
		const productItems=[{sku:'A',price:'20'},{sku:'B',price:'20'},{sku:'C',price:'20'}]
		const productList=new products.Products()
		productItems.forEach((p)=>{
			productList.add(p)
		})
		const productDetail=productList.get('D')
		assert.equal(productDetail, null);
	});
});