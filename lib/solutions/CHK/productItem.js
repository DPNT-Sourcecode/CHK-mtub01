class ProductItem{

    constructor(sku,price,offer=null)
    {
        this.sku=sku
        this.price=price
        this.offer=offer
        this.reduction=this._prepareReductionObject(offer)
    }
    _prepareReductionObject(offerString)
    {
        const stripQuantityFromOffer=offerString.match(/(\d+)A/)
        const stripAmountFromOffer=offerString.match(/for (\d+)$/)
        let quantity=null
        let amount=null
        if (stripQuantityFromOffer && stripQuantityFromOffer[1])
        {
            quantity=parseInt(stripQuantityFromOffer[1])

        }
        if (stripAmountFromOffer && stripAmountFromOffer[1])
        {
            amount=parseInt(stripAmountFromOffer[1])

        }
        if (amount && quantity)
        {
            return {perPrice:amount/quantity,totalPrice:amount,quantity:quantity}
        }
        else
        {
            return null
        }
    }
}
module.exports.ProductItem=ProductItem

