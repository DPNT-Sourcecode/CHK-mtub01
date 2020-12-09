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
            this.products[sku]={quantity:quantity,product:product,totalPrice:0}
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
            else
            {
                delete this.products[sku]
                
            }
            
        }
    }
    getCartItems()
    {
        const items=[]
        for (const sku in this.products)
        {
            items.push(this.products[sku])
        }
        return items
    }
    getItemSku(sku)
    {
        return this.products[sku]
    }
    getNormalizedCartItem()
    {
        const items=[]
        for (const sku in this.products)
        {
            const productDetails=this.products[sku]
            const product=productDetails.product
            const quantity=productDetails.quantity
            if (product.reduction)
            {
                const findFree=product.reduction.find((p)=>{
                    return p.free
                })
                if (findFree)
                {
                    const freeItem=findFree.free.sku
                    const freeQuantity=findFree.free.quantity
                }
            }
            items.push(this.products[sku])
        }
        return items       
        
    }
}
module.exports.Cart=Cart


