class Cart{
    constructor()
    {
        this.products={}
        this.payableProducts={}
    }
    addToCart(product,quantity=null)
    {

    }
    removeFromCart(product,quantity)
    {

    }
    getCartItems()
    {
        return this.products
    }
    getItemSku()
    {
        return this.products
    }
}
module.exports.Cart=Cart
