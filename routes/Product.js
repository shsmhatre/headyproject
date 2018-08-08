var express = require('express');
var productService = require('../service/ProductService');
var router = express.Router();

/* GET all products. */
router.get('/', function(req, res, next) {
    var inputData = {};
    if (req.query.category_id) {
        inputData.category_id = parseInt(req.query.category_id);
    }
    productService.findProduct(inputData)
    .then(function(result) {
        res.status(200);
        res.send({data:result});
    })
    .catch(function(error){
        res.status(404);
        res.send({error: error.message});
    })
});

/* GET particular product. */
router.get('/:id', function(req, res, next) {
    var inputData = {};
    inputData.id = req.params.id;
    productService.findProduct(inputData)
    .then(function(result) {
        res.status(200);
        res.send({data:result});
    })
    .catch(function(error){
        res.status(404);
        res.send({error : error.message});
    })
});

/*Create product */
router.post('/', function(req, res, next) {
  logger.log('debug', 'Input Data:'+JSON.stringify(req.body));
  //logger.log('debug', 'JSON Data:'+JSON.parse(req.body.categories));
  let inputData = {
      product_name : req.body.product_name,
      price : req.body.price,
      total_quantity : req.body.total_quantity,
      categories : JSON.parse(req.body.categories)
  };
  productService.addProduct(inputData)
  .then(function(data) {
      res.status(201);
      var response = {};
      response.id = data.id;
      response.url = "/product/"+data.id;
      res.send(response);
  })
  .catch(function(error) {
      res.status(400);
      res.send({ error: error.message});
  }) ;  
  
});
/**
 * update product details
 */
router.put('/', function(req, res, next) {
    logger.log('debug', 'Input Data:'+JSON.stringify(req.body));
    //logger.log('debug', 'JSON Data:'+JSON.parse(req.body.categories));
    let inputData = {
        id : req.body.id,
        product_name : req.body.product_name,
        price : req.body.price,
        total_quantity : req.body.total_quantity,
        categories : JSON.parse(req.body.categories),
        category_id : parseInt(req.body.category_id)
    };
    productService.updateProduct(inputData)
    .then(function(data) {
        res.status(200);
        var response = {};
        response.id = data.id;
        response.url = "/product/"+data.id;
        res.send(response);
    })
    .catch(function(error) {
        logger.log('error', 'Error updating product:'+JSON.stringify(error));
        res.status(204);
        res.send({ error: error.message});
    }) ;  
    
  });
module.exports = router;
