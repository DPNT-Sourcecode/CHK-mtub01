
const ProductList=require('./stock').Stock
const Cart = require('./cart').Cart
const Billing=require('./billing').Billing
const getCart = (skus) => {
    let cart = new Cart()

    for (const index in skus) {
        const sku = skus[index]
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

module.exports = function (skus) {
    if (!skus) {
        return 0
    }
    const myCart = getCart(skus)
    const myBiller=new Billing(myCart)
    const totalValue = myBiller.getCheckoutPrice()
    return totalValue
};
