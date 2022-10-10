const init = db => {
  const Category = require('../models/category')(db);
  const Product = require('../models/product')(db);
  
  const getCategories = async (req, res) => {
    const products = await Product.getProductsByCategoryId(req.params.id, req.query);
    const category = await Category.getCategoryById(req.params.id);
  
    res.render('category', {
      category,
      products,
    });
  };
  
  const adminGetCategories = async (req, res) => {
    const categories = await Category.getCategories();
    res.render('admin/categories/index', {
      categories,
    });
  };
  
  const adminCreateCategories = async (req, res) => {
    if (req.method === 'GET') {
      res.render('admin/categories/create', {
        form:{},
        errors: []
      });
    } else {
      try {
        await Category.createCategory(req.body);
        res.redirect('/admin/categorias');
      } catch (err) {
        res.render('admin/categories/create', {
          form: req.body,
          errors: err.errors.fields,
        });
      }
    }
  };
  
  const adminRemoveCategories = async(req, res) => {
    await Category.removeCategory(req.params.id)
    res.redirect('/admin/categorias');
  }
  
  const adminUpdateCategories = async (req, res) => {
    if (req.method === 'GET') {
      const category = await Category.getCategoryById(req.params.id);
      res.render('admin/categories/update', {
        form: category[0],
        errors: []
      });
    } else {
      try {
        await Category.updateCategory(req.params.id, req.body);
        res.redirect('/admin/categorias');
      } catch (err) {
        res.render('admin/categories/update', {
          form: req.body,
          errors: err.errors.fields,
        });
      }
    }
  };
  
  return {
    adminGetCategories,
    adminCreateCategories,
    adminRemoveCategories,
    adminUpdateCategories,
  
    getCategories,
  };
  
} 
module.exports = init;

