'use strict';

//noinspection JSUnusedLocalSymbols
const Products=require('./products').Products
const ProductItem=require('./productItem').ProductItem
const myProducts=[
{sku:'A' ,price:50 ,offer:'3A for 130'},
{sku:'B' ,price:30,offer:'2B for 45'},
{sku:'C' ,price:20},
{sku:'D' ,price:15},
]
const ProductList=new Products()

const init=()=>{
    myProducts.forEach((product)=>{
        const pOnbj=new ProductItem(product.sku,product.price,product.offer)
        ProductList.add(pOnbj)
    })

}
const priceCalculator=(product,quantity)=>{
    if (product.reduction)
    {
        const perPrice=product.reduction.perPrice
        const offerPrice=product.reduction.totalPrice
        const offerQuantity=product.reduction.quantity
        const forOriginalPrice=quantity%offerQuantity
        const inOffer=(quantity - forOriginalPrice)/offerQuantity
        const totalPrice=inOffer*offerPrice + forOriginalPrice * product.price
        return totalPrice
    }
    else
    {
        return product.price*quantity
    }
}
const calculatePrice=(sku,quantity)=>{
    const product=ProductList.get(sku)
    if (product)
    {
        
        return priceCalculator(product,quantity)
    }
    else{
        return -1
    }

}
const getGroupedSkus=(skus)=>{
    const skuList=skus.split('')
    const groupedData={}
    skuList.forEach((sku)=>{
        if (groupedData[sku])
        {
            groupedData[sku]+=1
        }else
        {
            groupedData[sku]=1
        }
    })
    return groupedData

}
module.exports = function (skus) {
    let totalValue=0
    if (!skus)
    {
        totalValue=0
    }
    else
    {
        const skusGroup=getGroupedSkus(skus)
        for (const key in skusGroup)
        {
            const price=calculatePrice(key,skusGroup[key])
            if (price==-1)
            {
                totalValue=-1
                break
            }
            else
            {
                totalValue=totalValue+price
            }

        }
  
    }
    return totalValue
};

init()