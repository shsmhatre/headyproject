var express = require('express');
var categoryService = require('../service/CategoryService');
var router = express.Router();

/* GET all categories. */
router.get('/', function(req, res, next) {
    logger.log('debug', 'Inside get all categories');
    categoryService.findCategory()
    .then(function(result) {
        res.status(200);
        res.send({data:result});
    })
    .catch(function(error){
        res.status(404);
        res.send(error);
    })
});

/* GET particular category. */
router.get('/:id', function(req, res, next) {
    var inputData = {};
    inputData.id = req.params.id;
    categoryService.findCategory(inputData)
    .then(function(result) {
        res.status(200);
        res.send({data:result});
    })
    .catch(function(error){
        res.status(404);
        res.send(error);
    })
});


/*Create category */
router.post('/', function(req, res, next) {
  logger.log('debug', 'Input Data:'+JSON.stringify(req.body));
  let inputData = {
      category_name : req.body.category_name,
      parent_category_id : req.body.parent_category_id
  };
  categoryService.addCategory(inputData)
  .then(function(data) {
      res.status(201);
      var response = {};
      response.id = data.id;
      response.url = "/category/"+data.id;
      res.send(response);
  })
  .catch(function(error) {
      res.status(400);
      res.send({ error: error.message});
  }) ;  
  
});
module.exports = router;
