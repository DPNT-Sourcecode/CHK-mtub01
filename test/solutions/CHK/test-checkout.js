var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');
const products = require('../../../lib/solutions/CHK/data/products.json');
describe('Checkout Challenge: calculate checkout amount', function() {
	it('should return 0, if empty string or null', function() {
	    assert.equal(checkout(''), 0);
	});
	it('should return 20, if C in inputString', function() {
	    assert.equal(checkout('C'), 20);
	});
	it('should return 70, if AC in inputString', function() {
	    assert.equal(checkout('AC'), 70);
	});
	it('should return -1, if Am in inputString', function() {
	    assert.equal(checkout('Am'), -1);
	});
	it('should return -1, if AxA in inputString', function() {
	    assert.equal(checkout('AxA'), -1);
	});

	it('should return 130, if AAA in inputString', function() {
	    assert.equal(checkout('AAA'), 130);
	});
	it('should return 330, if 8A (3A for 130, 5A for 200) in inputString', function() {
	    assert.equal(checkout('AAAAAAAA'), 330);
	});
	it('should return 330, if 7A1B  in inputString', function() {
	    assert.equal(checkout('AAAAAAAB'), 330);
	});
	it('should return 380, if 7A1BEE  in inputString', function() {
	    assert.equal(checkout('AAAAAAABEE'), 380);
	});
	it('should return 160, if 4E  in inputString', function() {
	    assert.equal(checkout('EEEE'), 160);
	});
	it('should return 20, if 3F  in inputString', function() {
	    assert.equal(checkout('FFF'), 20);
	});
	it('should return 30, if 4F  in inputString', function() {
	    assert.equal(checkout('FFFF'), 30);
	});
	it('should return 410, if 7A1B2E4F  in inputString', function() {
	    assert.equal(checkout('AAAAAAABEEFFFF'), 410);
	});
	it('should check all Products single', function() {
		const items=products.map((m)=>{return m.sku}).join('')
		const totalValue=products.reduce((a,b)=>{return a+b.price},0)
	    assert.equal(checkout(items), totalValue);
	});
	it('should check multiple Products combination with offer', function() {
		const items=[{sku:'A',count:8,expectedPrice:330},
		{sku:'B',count:2,expectedPrice:30},
		{sku:'E',count:2,expectedPrice:80},
		{sku:'F',count:3,expectedPrice:20},
		{sku:'H',count:16,expectedPrice:80+45+10},
		{sku:'K',count:3,expectedPrice:150+80},
		]
		const totalValue=items.reduce((a,b)=>{return a+b.expectedPrice},0)
		let skuString=''
		items.forEach((item)=>{
			 skuString+=item.sku.repeat(item.count)
			

		})
		assert.equal(checkout(skuString), totalValue);
		
	   
	});
});