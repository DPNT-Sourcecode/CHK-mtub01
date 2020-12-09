const reductionSchemes={
    'multipack':(offerString)=>{
        if (offerString)
        {
            const stripQuantityFromOffer=offerString.match(/(\d+)\w+ for/)
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
        else
        {
            return null
        }
    },
    'freepack':(offerString)={

    },
    'default':(offerString)=>{
        return null
    }
}
class ProductItem{

    getReductionPack(offerString){
        if ('free' in offerString)
        {
            return reductionSchemes['freepack']
        }else if(offerString.match(/(\d+)\w+ for (\d+)$/))
        {
            return reductionSchemes['multipack']
        }
        else
        {
            return reductionSchemes['default']
        }


    }
    constructor(sku,price,offer=null)
    {
        this.sku=sku
        this.price=price
        this.offer=offer
        this.reduction=this._prepareReductionObject(offer)
    }
    _multipleReduction(offerString)
    {
        const offers=offerString.split(',')
        const mythis=this
        offers.forEach((offer)=>{
            const redFunction=mythis.getReductionPack(offerString)
        })
        
    }
    _prepareReductionObject(offerString)
    {

       
    }
}
module.exports.ProductItem=ProductItem

