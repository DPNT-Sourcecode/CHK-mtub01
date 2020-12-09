const wordToNumbers=require('words-to-numbers')
const reductionSchemes = {
    'multipack': (offerString) => {
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
    'freepack': (offerString) => {
        if (offerString)
        {
            const copyString=wordToNumbers.wordsToNumbers(offerString)
            const stripQuantityFromOffer = copyString.match(/(\d+)\w+ get/)
            const stripAmountFromOffer = copyString.match(/(\d+) (\w+) free$/)
            let quantity = null
            let amount = null
            let freeItem=null
            let freeQuantity=null
            if (stripQuantityFromOffer && stripQuantityFromOffer[1]) {
                quantity = parseInt(stripQuantityFromOffer[1])

            }
            if (stripAmountFromOffer && stripAmountFromOffer[1]) {
                freeQuantity = parseInt(stripAmountFromOffer[1])
                freeItem =stripAmountFromOffer[2]
            }
            if (quantity && freeItem && freeQuantity) {
                const freeObj={sku:freeItem,quantity:freeQuantity}
                return { free: freeObj, totalPrice: 0, quantity: quantity }
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

    getReductionPack(offerString) {
        if (!offerString) {
            return null
        }
        else if (offerString.endsWith('free')) {
            return reductionSchemes['freepack']
        } else if (offerString.match(/(\d+)\w+ for (\d+)$/)) {
            return reductionSchemes['multipack']
        }
        else {
            return reductionSchemes['default']
        }


    }
    constructor(sku, price, offer = null) {
        this.sku = sku
        this.price = price
        this.offer = offer
        this.reduction = this._getReductions(offer)
    }
    _getReductions(offerString) {
        if (offerString) {
            const offers = offerString.split(',')
            const mythis = this
            const reductions = []
            offers.forEach((offer) => {
                const redFunction = mythis.getReductionPack(offer)
                const redObj = redFunction(offer)
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