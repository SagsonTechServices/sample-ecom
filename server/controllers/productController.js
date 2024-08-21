// required packages 
const productModel = require('../models/productModel')

// define controllers 

// 1. controller to fetch all the products 
const fetchAllProducts = (req , res) => {
    productModel.getAllProducts((err , products) => {
        if(err){
            res.status(400).json({
                message : 'Internal server error'
            })
        }
        res.status(200).json(products)
    })
}

// 2. Controller to fetch product by ID 
const fetchProductById = (req , res) => {
    productModel.getProductById(req.params.id , (err , product) => {
        if(err){
            res.status(400).json({
                message : 'Internal server error'
            })
        }
        res.status(200).json(product)
    })
}

// 3. fetch products by category 
const fetchProductsByCategory = (req , res) => {
    productModel.getProductsByCategory(req.params.category , (err , products) => {
        if(err){
            res.status(400).json({
                message : 'Internal server error'
            })
        }
        res.status(200).json(products)
    })
}

// 3. search products 
const searchProducts = (req , res) => {
    const searchTerm = req.query.q || ''
    const filters = {
        category : req.query.category , 
        brand : req.query.brand , 
        minPrice : req.query.min_price , 
        maxPrice : req.query.max_price
    }

    productModel.searchProducts(searchTerm , filters , (err , products) => {
        if(err){
            res.status(400).json(
                {
                    message : 'Internal server error'
                }
            )
        }
        res.status(200).json({
            products
        })
    })
}

// export controllers 
module.exports = {fetchAllProducts , fetchProductById , fetchProductsByCategory , searchProducts}