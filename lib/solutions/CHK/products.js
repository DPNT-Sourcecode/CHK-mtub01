'use strict'
class Product{
    constructor()
    {
        this.products=[]
    }
    add(product){
        this.products.push(product)

    }
    get(sku)
    {

    }
    all()
    {
        return this.products
    }
}
class ProductItem{

    constructor(sku,price,offer=None)
    {
        this.sku=sku
        this.price=price
        this.offer=offer
    }
}
module.exports.Product=Product
module.exports.ProductItem=ProductItem
