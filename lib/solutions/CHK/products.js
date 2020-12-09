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
        const find= this.products.find((f)=>{return f.sku==sku})
        if (find)
        {
            const copyObj=Object.assign({},find)
            return copyObj
        }
        else
        {
            return find
        }
    }
    all()
    {
        return this.products
    }
}
module.exports.Products=Products
