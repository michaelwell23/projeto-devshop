const init = db => {

  const router = require('express').Router()
  
  const categoriesRouter = require('./categories')(db);
  const productsRouter = require('./products')(db);

  router.use((req, res, next) => {
    if(req.session.user){
      if(req.session.user.roles.indexOf('admin') < 0){
        res.redirect('/');
      }else{
        next()
      }
    }else{
      res.redirect('/login')
    }
  })

  router.get('/', (req, res) => res.render('admin/index'));
  router.use('/categorias',categoriesRouter);
  router.use('/produto', productsRouter);

  return router;
}

module.exports = init

