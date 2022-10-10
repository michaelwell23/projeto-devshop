const init = (db) => {
  const router = require('express').Router();
  
  const {
    adminGetCategories,
    adminCreateCategories,
    adminRemoveCategories,
    adminUpdateCategories,
  } = require('../../controllers/CategoriasController')(db);

  router.get('/', adminGetCategories);
  
  router.get('/nova', adminCreateCategories);
  router.post('/nova', adminCreateCategories);
  
  router.get('/excluir/:id', adminRemoveCategories);
  router.get('/editar/:id', adminUpdateCategories);
  router.post('/editar/:id', adminUpdateCategories);

  return router;
};

module.exports = init;
