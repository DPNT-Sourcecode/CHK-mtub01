class Cart{
    constructor()
    {
        this.products={}
        this.payableProducts={}
    }
    addToCart(product,quantity=1)
    {
        const sku=product.sku
        if (this.products[sku])
        {
            this.products[sku].quantity=this.products[sku].quantity+quantity
        }else
        {
            this.products[sku]={quantity:quantity,product:product}
        }
    }
    removeFromCart(product,quantity)
    {
        const sku=product.sku
        if (this.products[sku])
        {
            const diff=this.products[sku].quantity-quantity
            if (diff>0)
            {
                this.products[sku].quantity=diff
            }
            this.products[sku].quantity=this.products[sku].quantity+quantity
        }else
        {
            this.products[sku]={quantity:quantity,product:product}
        }
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

