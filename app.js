const init = (db) => {
  const express = require('express');
  const bodyParser = require('body-parser')
  const session = require('express-session');

  const app = express();

  const Category = require('./models/category')(db);
  const routes = require('./routes');

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(session({
    secret: 'MyDevShopRules!',
    name: 'sessionId',
    resave: true,
    saveUninitialized: true,
  }))

  app.set('view engine', 'ejs');
  app.use(express.static('public'));

  //MIDDLEWARE
  app.use(async (req, res, next) => {
    const categories = await Category.getCategories();
    const { user } = req.session
    res.locals = {
      categories,
      user,
    };
    next();
  });

  app.use(routes(db));

  return app;
};

module.exports = init;
