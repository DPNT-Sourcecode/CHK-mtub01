class Cart {
    constructor(products={}) {
        this.products = products
    }
    addToCart(product, quantity = 1) {
        const sku = product.sku
        if (this.products[sku]) {
            this.products[sku].quantity = this.products[sku].quantity + quantity
        } else {
            this.products[sku] = { quantity: quantity, product: product }
        }
    }
    setProducts(products)
    {
        products.forEach((p)=>{
            this.products[p.product.sku]=Object.assign({},p)

        })
    }
    removeFromCart(product, quantity) {
        const sku = product.sku
        if (this.products[sku]) {
            const diff = this.products[sku].quantity - quantity
            if (diff > 0) {
                this.products[sku].quantity = diff
            }
            else {
                delete this.products[sku]

            }

        }
    }
    getCartItems() {
        const items = []
        for (const sku in this.products) {
            items.push(this.products[sku])
        }
        return items
    }
    getItemSku(sku) {
        return this.products[sku]
    }
    freeCheck(productDetails){
        const mythis=this
        const product = productDetails.product
        const itemLeft = productDetails.quantity
        const productPrice = product.price
        if (product.reduction) {
            const findFree = product.reduction.find((p) => {
                return p.free
            })
            if (findFree) {
                const offerQuantity = findFree.quantity
                const freeItem = findFree.free.sku
                const freeQuantity = findFree.free.quantity
                const freeSkuProduct = this.products[freeItem]
                if (freeSkuProduct) {
                    const forOriginalPrice = itemLeft % offerQuantity
                    const inOffer = (itemLeft - forOriginalPrice) / offerQuantity
                    product.totalPrice = inOffer * offerQuantity * productPrice
                    productDetails.quantity = forOriginalPrice
                    mythis.removeFromCart(freeSkuProduct.product, freeQuantity * inOffer)


                }

            }
            product.reduction=product.reduction.filter((f)=>{return f!=findFree})
        }     
    }
    groupCheck(productDetails)
    {
        const mythis=this
        const product = productDetails.product
        const currentSKU=product.sku
        const itemLeft = productDetails.quantity
        const productPrice = product.price
        if (product.reduction) {
            const findGroup = product.reduction.find((p) => {
                return p.group
            })
            if (findGroup) {
                const offerQuantity = findGroup.quantity
                const groups = findGroup.group
                const offerPrice=findGroup.totalPrice
                const groupItems=groups.map((sku)=>{
                    return mythis.getItemSku(sku)
                }).sort((a,b)=>{return b.product.price-a.product.price})
                const itemLeft=groupItems.reduce((a,b)=>{return a+b.quantity},0)
                const forOriginalPrice = itemLeft % offerQuantity
                const inOfferQuotient = (itemLeft - forOriginalPrice) / offerQuantity
                let totalInOfferItems=inOfferQuotient*offerQuantity
                
                while (totalInOfferItems!=0)
                {
                    groupItems.forEach((g)=>{
                        const q=g.quantity
                        if (q<=totalInOfferItems)
                        {
                            g.quantity=g.quantity-q
                            totalInOfferItems-=q
                        }else{
                            g.quantity=g.quantity-totalInOfferItems
                            totalInOfferItems=0
                        }
                        g.product.reduction=g.product.reduction.filter((f)=>{return !f.group})
                        
    
                    })
                }
                

            }
            product.reduction=product.reduction.filter((f)=>{return f!=findGroup})
        }   
    }
    getNormalizedCartItem() {
        const mythis = this
        for (const sku in this.products) {
            const productDetails = this.products[sku]
            mythis.freeCheck(productDetails)
            mythis.groupCheck(productDetails)
        }
        return this.getCartItems()

    }
}
module.exports.Cart = Cart