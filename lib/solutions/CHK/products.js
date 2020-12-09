'use strict'
class Products{
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

    constructor(sku,price,offer=null)
    {
        this.sku=sku
        this.price=price
        this.offer=offer
    }
}
module.exports.Products=Products
module.exports.ProductItem=ProductItem