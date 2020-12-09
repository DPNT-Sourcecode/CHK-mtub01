
const ProductList=require('./stock').Stock
console.log('-----',ProductList)
const Cart = require('./cart').Cart

const priceCalculator = (product, quantity) => {

    if (product.reduction) {
        let itemLeft = quantity
        console.log('---- ItemLeft', product.totalPrice)
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
const getCart = (skus) => {
    let cart = new Cart()

    for (const index in skus) {
        const sku = skus[index]
        console.log('----', sku)
        const product = ProductList.get(sku)
        if (product) {
            cart.addToCart(product)
        }
        else {
            cart = -1
            break
        }

    }
    return cart

}
const getCheckoutPrice = (cart) => {
    if (cart == -1) {
        return -1
    }
    let totalValue = 0
    const items = cart.getNormalizedCartItem()
    items.forEach((item) => {
        totalValue += priceCalculator(item.product, item.quantity)
    })
    return totalValue
}
module.exports = function (skus) {
    if (!skus) {
        return 0
    }
    const myCart = getCart(skus)
    const totalValue = getCheckoutPrice(myCart)
    return totalValue
};
