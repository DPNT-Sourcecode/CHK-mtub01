'use strict';

//noinspection JSUnusedLocalSymbols
const Products = require('./products').Products
const ProductItem = require('./productItem').ProductItem
const Cart = require('./cart').Cart
const myProducts = [
    { sku: 'A', price: 50, offer: '3A for 130' },
    { sku: 'B', price: 30, offer: '2B for 45' },
    { sku: 'C', price: 20 },
    { sku: 'D', price: 15 },
]
const ProductList = new Products()

const init = () => {
    myProducts.forEach((product) => {
        const pOnbj = new ProductItem(product.sku, product.price, product.offer)
        ProductList.add(pOnbj)
    })

}
const priceCalculator = (product, quantity) => {

    if (product.reduction) {
        let itemLeft = quantity
        let totalPrice = 0
        console.log('----', itemLeft)
        product.reduction.forEach((red) => {
            const perPrice = red.perPrice
            const offerPrice = red.totalPrice
            const offerQuantity = red.quantity
            const forOriginalPrice = itemLeft % offerQuantity
            const inOffer = (itemLeft - forOriginalPrice) / offerQuantity
            if (inOffer) {
                itemLeft = forOriginalPrice
                totalPrice = inOffer * offerPrice
            }
            // const totalPrice = inOffer * offerPrice + forOriginalPrice * product.price
        })
        console.log('----', itemLeft)
        totalPrice = totalPrice + itemLeft * product.price
        return totalPrice
    }
    else {
        return product.price * quantity
    }
}
const calculatePrice = (sku, quantity) => {
    const product = ProductList.get(sku)
    if (product) {

        return priceCalculator(product, quantity)
    }
    else {
        return -1
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
    const items = cart.getCartItems()
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

init()








