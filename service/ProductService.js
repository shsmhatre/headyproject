var Product = require("../model/ProductModel");
var counterService = require("./CounterService");
var productService = {
    addProduct : addProduct,
    findProduct : findProduct,
    updateProduct : updateProduct
}
function addProduct(inputData) {
    return new Promise(function(resolve, reject) {
        let product = new Product(
            {
                product_name : inputData.product_name,
                categories : inputData.categories,
                price : inputData.price,
                total_quantity : inputData.total_quantity
            }
        );
        product.save(function(err) {
            if(err) {
                logger.log('error', 'Error in storing product:'+err);
                reject(err);
            } else {
                resolve(product);
            }
        });
    }); 
}
function findProduct(inputData) {
    return new Promise(function(resolve, reject) {
        var queryParams = {};
        if(inputData.id) {
            queryParams.id = inputData.id;
        }
        if (inputData.category_id) {
            queryParams.categories  = {$in: [inputData.category_id]} ;
        }
        logger.log('debug', 'query :'+JSON.stringify(queryParams));
        Product.find(queryParams, {_id:0, __v:0}, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function updateProduct(inputData) {
    return new Promise(function(resolve, reject) {
        logger.log('debug', 'Input Data:'+JSON.stringify(inputData));
        Product.findOne({id : inputData.id}, function(err, product){
            if(err) {
                logger.log('error', err);
                reject(err);
            } else  {
                logger.log('debug', 'Product Data:'+JSON.stringify(product));

                //Replace all categories
                if (inputData.categories) {
                    product.categories = inputData.categories;
                }
                //Push new cateogry
                if (inputData.category_id) {
                    product.categories.push(inputData.category_id);
                }
                if (inputData.product_name) {
                    product.product_name = inputData.product_name;
                }
                if (inputData.price) {
                    product.price = inputData.price;
                }
                if (inputData.total_quantity) {
                    product.total_quantity = inputData.total_quantity;
                }
                logger.log('debug', 'Product object:'+JSON.stringify(product));
                product.save(function(err) {
                    if(err) {
                        logger.log('error', err);
                        reject(err);
                    } else {
                        resolve(product);
                    }
                });
            }
        });
    });
}
module.exports = productService;