'use strict';

//noinspection JSUnusedLocalSymbols
const Products = require('./products').Products
const ProductItem = require('./productItem').ProductItem
const myProducts = require('./data/products.json')
const ProductList = new Products()

const init = () => {
    myProducts.forEach((product) => {
        const pOnbj = new ProductItem(product.sku, product.price, product.offer)
        ProductList.add(pOnbj)
    })

}
init()
module.exports.Stock=ProductList