class ProductItem{

    constructor(sku,price,offer=null)
    {
        this.sku=sku
        this.price=price
        this.offer=offer
    }
    _prepareReductionObject(offerString)
    {
        const stripQuantityFromOffer=offerString.match(/(\d+)A/)
        let quantity=null
        if (stripQuantityFromOffer)
        {

        }
    }
}
module.exports.ProductItem=ProductItem