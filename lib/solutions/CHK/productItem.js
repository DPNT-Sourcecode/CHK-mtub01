const wordToNumbers=require('words-to-numbers')
const reductionSchemes = {
    'multipack': (offerString,price) => {
        if (offerString) {
            const stripQuantityFromOffer = offerString.match(/(\d+)\w+ for/)
            const stripAmountFromOffer = offerString.match(/for (\d+)$/)
            let quantity = null
            let amount = null
            if (stripQuantityFromOffer && stripQuantityFromOffer[1]) {
                quantity = parseInt(stripQuantityFromOffer[1])

            }
            if (stripAmountFromOffer && stripAmountFromOffer[1]) {
                amount = parseInt(stripAmountFromOffer[1])

            }
            if (amount && quantity) {
                return { perPrice: amount / quantity, totalPrice: amount, quantity: quantity }
            }
            else {
                return null
            }
        }
        else {
            return null
        }
    },
    'freepack': (offerString,price) => {
        if (offerString)
        {
            const copyString=wordToNumbers.wordsToNumbers(offerString)
            const stripQuantityFromOffer = copyString.match(/(\d+)(\w+) get/)
            const stripAmountFromOffer = copyString.match(/(\d+) (\w+) free$/)
            let quantity = null
            let amount = null
            let freeItem=null
            let freeQuantity=null
            let offerItem=null
            if (stripQuantityFromOffer && stripQuantityFromOffer[1]) {
                quantity = parseInt(stripQuantityFromOffer[1])
                offerItem=stripQuantityFromOffer[2]
            }
            if (stripAmountFromOffer && stripAmountFromOffer[1]) {
                freeQuantity = parseInt(stripAmountFromOffer[1])
                freeItem =stripAmountFromOffer[2]
            }
            if (quantity && freeItem && freeQuantity && offerItem!=freeItem) {
                const freeObj={sku:freeItem,quantity:freeQuantity}
                return { free: freeObj, totalPrice: 0, quantity: quantity }
            }
            else if(quantity && freeItem && freeQuantity && offerItem==freeItem)
            {
                const totalQuantity=freeQuantity+quantity
                const offerPrice=quantity*price
                const oString=`${totalQuantity}${freeItem} for ${offerPrice}`
                
                const redObj= reductionSchemes["multipack"](oString)
                return redObj
            }
            else {
                return null
            }          
        }
        else
        {
            return null
        }

    },
    'grouppack': (offerString,price) => {
        if (offerString)
        {
            const stripData = offerString.match(/buy any (\d+) of \((.*)\) for (\d+)/)
            let quantity = null
            let amount = null
            let group=null
            if (stripData && stripData.length==4)
            {
                try{
                    const quantity=parseInt(stripData[1])
                    const group=stripData[2].split(',')
                    const offerPrice=parseInt(stripData[3].split(','))
                    const groupData={group:group,quantity:quantity,totalPrice:offerPrice}
                    return groupData
                }catch(exception)
                {
                    console.error('Error Occured While Parsing Group')
                    return null
                }

            }
            else {
                return null
            }          
        }
        else
        {
            return null
        }

    },
    'default': (offerString) => {
        return null
    }
}
class ProductItem {


    constructor(sku, price, offer = null) {
        this.sku = sku
        this.price = price
        this.offer = offer
        this.reduction = this._getReductions(offer)
    }
    getReductionPack(offerString) {
        if (!offerString) {
            return null
        }
        else if (offerString.endsWith('free')) {
            return reductionSchemes['freepack']
        }
        else if (offerString.startsWith('buy any')) {
            return reductionSchemes['grouppack']
        } 
        else if (offerString.match(/(\d+)\w+ for (\d+)$/)) {
            return reductionSchemes['multipack']
        }
        else {
            return reductionSchemes['default']
        }


    }
    _getReductions(offerString) {
        if (offerString) {
            const offers = offerString.split(',')
            const mythis = this
            const reductions = []
            offers.forEach((offer) => {
                const redFunction = mythis.getReductionPack(offer)
                const redObj = redFunction(offer,mythis.price)
                // console.log('redOb',redObj)
                if (redObj) {
                    if (!redObj.totalPrice)
                    {
                        redObj.totalPrice=mythis.price*redObj.quantity
                    }
                    reductions.push(redObj)
                }

            })
            if (reductions.length) {
                return reductions.sort((a,b)=>{return b.quantity - a.quantity})
            }
            else {
                return null
            }
        } else {
            return null
        }


    }
}
module.exports.ProductItem = ProductItem