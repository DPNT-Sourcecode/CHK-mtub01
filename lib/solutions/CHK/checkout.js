'use strict';

//noinspection JSUnusedLocalSymbols
const Product=require('./products').Products
const ProductItem=require('./productItem').ProductItem
const myProductions=[
{sku:'A' ,price:50 ,offer:'3A for 130'},
{sku:'B' ,price:30,offer:'2B for 45'},
{sku:'C' ,price:20},
{sku:'D' ,price:15},
]
module.exports = function (skus) {
    if (!skus)
    {
        return -1
    }
};
