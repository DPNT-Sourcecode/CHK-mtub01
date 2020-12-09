class Billing{

    constructor(cart)
    {
        cart=cart
    }
    getCheckoutPrice(cart){
        const mythis=this
        if (cart == -1) {
            return -1
        }
        let totalValue = 0
        const items = cart.getNormalizedCartItem()
        items.forEach((item) => {
            totalValue += mythis.priceCalculator(item.product, item.quantity)
        })
        return totalValue
    }
    priceCalculator(product, quantity){

        if (product.reduction) {
            let itemLeft = quantity
            let totalPrice = product.totalPrice?product.totalPrice:0
            product.reduction.forEach((red) => {
                const perPrice = red.perPrice
                const offerPrice = red.totalPrice
                const offerQuantity = red.quantity
                const forOriginalPrice = itemLeft % offerQuantity
                
                const inOffer = (itemLeft - forOriginalPrice) / offerQuantity
                if (inOffer) {
                    itemLeft = forOriginalPrice
                    totalPrice+= inOffer * offerPrice
                }
                // const totalPrice = inOffer * offerPrice + forOriginalPrice * product.price
            })
            totalPrice = totalPrice + itemLeft * product.price
            return totalPrice
        }
        else {
            return product.price * quantity
        }
    }

}
module.exports.Billing=Billing
