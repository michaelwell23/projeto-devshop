const init = (db) => {
  const router = require('express').Router();
  
  const {
    adminGetProducts,
    adminCreateProducts,
    adminRemoveProducts,
    adminUpdateProducts,
  } = require('../../controllers/ProductsController')(db);

  router.get('/', adminGetProducts);
  
  router.get('/nova', adminCreateProducts);
  router.post('/nova', adminCreateProducts);
  
  router.get('/excluir/:id', adminRemoveProducts);

  router.get('/editar/:id', adminUpdateProducts);
  router.post('/editar/:id', adminUpdateProducts);

  return router;
};

module.exports = init;
