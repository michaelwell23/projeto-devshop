const init = db => {
  const router = require('express').Router();
  const { getCategories } = require('../controllers/CategoriasController')(db);
  
  router.get('/:id/:slug', getCategories);

  return router
}


module.exports = init