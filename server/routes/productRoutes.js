// packages 
const express = require('express')
const productController = require('../controllers/productController')

// create a router 
const router = express.Router()

// define routes 
router.get('/all/' , productController.fetchAllProducts)
router.get('/product/:id' , productController.fetchProductById)
router.get('/category/:category' , productController.fetchProductsByCategory)
router.get('/search' , productController.searchProducts)

// export the router 
module.exports = router