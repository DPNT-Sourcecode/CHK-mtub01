'use strict';

//noinspection JSUnusedLocalSymbols
const Products = require('./products').Products
const ProductItem = require('./productItem').ProductItem
const myProducts = [
    { sku: 'A', price: 50, offer: '3A for 130, 5A for 200' },
    { sku: 'B', price: 30, offer: '2B for 45' },
    { sku: 'C', price: 20 },
    { sku: 'D', price: 15 },
    { sku: 'E', price: 40,offer:'2E get one B free' },
    { sku: 'F', price: 10,offer:'2F get one F free' },
]
const ProductList = new Products()

const init = () => {
    myProducts.forEach((product) => {
        const pOnbj = new ProductItem(product.sku, product.price, product.offer)
        ProductList.add(pOnbj)
    })

}
init()
module.exports.Stock=ProductList
