const init = db => {
  const router = require('express').Router();
  const { getProduct } = require('../controllers/ProductsController')(db);
  
  router.get('/:id/:slug', getProduct)

  return router
}


module.exports = init

