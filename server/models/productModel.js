// required packages 
const db = require('../config/db.config');
const { param } = require('../routes/productRoutes');

// function to get all the products 
const getAllProducts = (callback) => {
    // define the query 
    const query = `
    select 
    p.id as product_id ,
    p.name ,
    p.description , 
    p.price , 
    p.image_url as product_image , 
    p.category , 
    p.brand , 
    pv.id as variant_id , 
    pv.color , 
    pv.size , 
    pv.image , 
    pv.stock

    from products p
    left join product_variants pv on p.id = pv.product_id;
    `;

    // run the query on the db 
    db.query(query , (err , results) => {
        // if an error occurs then return the error callback 
        if(err){
            return callback(err , null);
        }

        // else fetch all the products along with their variants 
        const products = {}
        results.forEach((row) => {
            const productId = row.product_id

            if(!products[productId]){
                products[productId] = {
                    id: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    image: row.product_image,
                    category: row.category,
                    brand: row.brand,
                    variants: []
                }
            }
            if(row.variant_id){
                products[productId].variants.push(
                    {
                        id: row.variant_id,
                        color: row.color,
                        image: row.variant_image,
                        size: row.size,
                        stock: row.stock
                    }
                )
            }
        })
        return callback(null , Object.values(products));
    })
}

// function to get a specific product 
const getProductById = (productId , callback) => {
    const query = `
    select 
    p.id as product_id ,
    p.name ,
    p.description , 
    p.price , 
    p.image_url as product_image , 
    p.category , 
    p.brand , 
    pv.id as variant_id , 
    pv.color , 
    pv.size , 
    pv.image , 
    pv.stock

    from products p
    left join product_variants pv on p.id = pv.product_id
    where p.id = ?;
    `;

    db.query(query , [productId] , (err , results) => {
        if(err){
            return callback(err , null);
        }
        const product = {
            id: results[0].product_id,
            name: results[0].name,
            description: results[0].description,
            price: results[0].price,
            image: results[0].product_image,
            category: results[0].category,
            brand: results[0].brand,
            variants: []
        }
        results.forEach((row) => {
            if(row.variant_id){
                product.variants.push(
                    {
                        id: row.variant_id,
                        color: row.color,
                        image: row.variant_image,
                        size: row.size,
                        stock: row.stock
                    }
                )
            }
        })

        return callback(null , product)
    })
}

// function to get products from a specific category 
const getProductsByCategory = (category , callback) => {
    const query = `
    select 
    p.id as product_id ,
    p.name ,
    p.description , 
    p.price , 
    p.image_url as product_image , 
    p.category , 
    p.brand , 
    pv.id as variant_id , 
    pv.color , 
    pv.size , 
    pv.image , 
    pv.stock

    from products p
    left join product_variants pv on p.id = pv.product_id
    where p.category = ?;
    `;

    db.query(query , [category] , (err , results) => {
        if(err){
            return callback(err , null)
        }
        const products = {}
        results.forEach((row) => {
            const productId = row.product_id
            if(!products[productId]){
                products[productId] = {
                    id: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    image: row.product_image,
                    category: row.category,
                    brand: row.brand,
                    variants: []
                }
            }
            if(row.variant_id){
                products[productId].variants.push({
                        id: row.variant_id,
                        color: row.color,
                        image: row.variant_image,
                        size: row.size,
                        stock: row.stock
                })
            }
        })
        return callback(null , products)
    })
} 

// function to search products 
const searchProducts = (searchTerm , filters , callback) => {
    let query = `
    select 
    p.id as product_id ,
    p.name ,
    p.description , 
    p.price , 
    p.image_url as product_image , 
    p.category , 
    p.brand , 
    pv.id as variant_id , 
    pv.color , 
    pv.size , 
    pv.image , 
    pv.stock

    from products p
    left join product_variants pv on p.id = pv.product_id

    where p.name like ? or p.description like ?
    `;

    const params = [`%${searchTerm}%` , `%${searchTerm}%`]

    // add filters 
    if(filters.category){
        query = query + `and p.category = ?`
        params.push(filters.category)
    }
    if(filters.brand){
        query = query + `and p.brand = ?`
        params.push(filters.brand)
    }
    if(filters.minPrice){
        query = query + `and p.price >= ?`
        params.push(filters.minPrice)
    }
    if(filters.maxPrice){
        query = query + `and p.price <= ?`
        params.push(filters.maxPrice)
    }

    db.query(query , params , (err , results) => {
        if(err){
            return callback(err , null)
        }

        const products = {}

        results.forEach((row) => {
            const productId = row.product_id
            if(!products[productId]){
                products[productId] = {
                    id: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    image: row.product_image,
                    category: row.category,
                    brand: row.brand,
                    variants: []
                }
            }
            if(row.variant_id){
                products[productId].variants.push({
                    id: row.variant_id,
                    color: row.color,
                    image: row.variant_image,
                    size: row.size,
                    stock: row.stock
                })
            }
        })

        callback(null , products)
    })
}


// export functions 
module.exports = {getAllProducts , getProductById , getProductsByCategory , searchProducts}