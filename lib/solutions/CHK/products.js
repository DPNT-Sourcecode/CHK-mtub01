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
        return this.products.find((f)=>{return f.sku==sku})
    }
    all()
    {
        return this.products
    }
}
module.exports.Products=Products
