const init = db => {
  const router = require('express').Router()
  
  const {getIndex} = require('../controllers/HomeController');
  const {getLogin, postLogin, logout} = require('../controllers/auth');

  const categoriesRouter = require('./categories');
  const productsRouter = require('./products');
  const adminRouter = require('./admin');

  router.get('/', getIndex);
  
  // auth
  router.get('/login', getLogin);
  router.post('/login', postLogin(db));
  router.get('/logout', logout);

  // router
  router.use('/admin', adminRouter(db));
  router.use('/categoria', categoriesRouter(db));
  router.use('/produto', productsRouter(db));

  return router;
}

module.exports = init

