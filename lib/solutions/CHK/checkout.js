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
const calculatePrice=(sku)=>{
    const product=ProductList.get(sku)
    if (product)
    {
        return product.price
    }
    else{
        return -1
    }

}
module.exports = function (skus) {
    let totalValue=0
    if (!skus)
    {
        return -1
    }
    {
        skusList=skus.split('')


    }
};
