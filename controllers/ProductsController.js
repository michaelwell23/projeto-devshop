const init = (db) => {
  const Product = require('../models/product')(db);

const getProduct = async (req, res) => {
    const products = await Product.getProductsByCategoryId(req.params.id, req.query);
    const category = await Category.getCategoryById(req.params.id);
  
    res.render('product-detail', {
      category,
      products,
    });
  };

  const adminGetProducts = async(req, res) => {
    const products = await Product.getProducts();
    res.render('admin/products/index',{
      products,
    });
  }

  const adminCreateProducts = async(req, res) => {
    if(req.method === 'GET'){
      res.render('admin/products/create', {
        form: {},
        errors: []
      })
    }else {
      try{
        await Product.createProduct(req.body)
        res.redirect('admin/produtos');
      }catch(err) {
        res.render('admin/products/create', {
          form: req.body,
          errors: err.errors.fields,
        })
      }
    }
  }

  const adminRemoveProducts = async(req, res) => {

  }

  const adminUpdateProducts = async (req, res)=> {

  }

  return {
    adminGetProducts,
    adminCreateProducts,
    adminRemoveProducts,
    adminUpdateProducts,
    
    getProduct,
  }
};

module.exports = init;
