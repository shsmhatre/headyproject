var Category = require("../model/CategoryModel");
var counterService = require("./CounterService");
var categoryService = {
    addCategory : addCategory,
    findCategory : findCategory,
    updateCategory : updateCategory
}
function addCategory(inputData) {
    return new Promise(function(resolve, reject) {
        let category = new Category(
            {
                category_name : inputData.category_name
            }
        );
        category.save(function(err) {
            if(err) {
                reject(err);
            } else {
                var updateData  = {};
                if (inputData.parent_category_id) {
                    updateData.id = inputData.parent_category_id;
                    updateData.child_category_id = category.id;
                    updateCategory(updateData)
                    .then(function(data) {
                        resolve(category);        
                    })
                    .catch(function(error) {
                        reject(error);
                    })
                } else {
                    resolve('success');
                }
            }
        });
    }); 
}
function findCategory(inputData) {
    return new Promise(function(resolve, reject) {
        var queryParams = {};
        if(inputData) {
            queryParams.id = inputData.id;
        }
        Category.find(queryParams, {_id:0, __v:0}, function(err, result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function updateCategory(inputData) {
    return new Promise(function(resolve, reject) {
        logger.log('debug', 'Input Data:'+JSON.stringify(inputData));
        Category.findOne({id : inputData.id}, function(err, category){
            if(err) {
                logger.log('error', err);
                reject(err);
            } else  {
                logger.log('debug', 'Category Data:'+JSON.stringify(category));
                if (inputData.child_category_id) {
                    category.child_categories.push(inputData.child_category_id);
                }
                if (inputData.category_name) {
                    category.category_name = inputData.category_name;
                }
                category.save(function(err) {
                    if(err) {
                        logger.log('error', err);
                        reject(err);
                    } else {
                        resolve(category);
                    }
                });
            }
        });
    });
}
module.exports = categoryService;