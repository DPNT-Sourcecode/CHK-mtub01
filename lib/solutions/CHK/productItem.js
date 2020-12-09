class ProductItem{

    constructor(sku,price,offer=null)
    {
        this.sku=sku
        this.price=price
        this.offer=offer
    }
}
module.exports.ProductItem=ProductItem