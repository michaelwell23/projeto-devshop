const init = (db) => {
  const slug = require('../utils/slug')
  const Joi = require('@hapi/joi')

  const validation = require('../utils/validation');

  const createSchema = Joi.object().keys({
    name: Joi.string().min(5).max(245).required(),
    description: Joi.string().min(5).required()
  })

  const getProductById = async (id) => {
    const product = await db('products').select('*').where('id', id);
    return product[0];
  };

  const getPaginationParams = (query) => {
    const { currentPage, pages, pageSize } = query;
    return {
      currentPage: currentPage ? parseInt(currentPage) : 0,
      pages: pages ? parseInt(pages) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 18,
    };
  };

  const getProductsByCategoryId = async (id, query) => {
    const pagination = getPaginationParams(query);
    console.log(pagination);
    const products = await db('products')
      .select('*')
      .whereIn('id', function () {
        this.select('categories_products.product_id')
          .from('categories_products')
          .where('category_id', id);
      })
      .offset(pagination.currentPage * pagination.pageSize)
      .limit(pagination.pageSize);

    const productsCount = await db('products')
      .count('* as total')
      .whereIn('id', function () {
        this.select('categories_products.product_id')
          .from('categories_products')
          .where('category_id', id);
      })
      .first();
    pagination.total = productsCount.total;
    pagination.totalPages = parseInt(productsCount.total / pagination.pageSize);

    return {
      data: products,
      pagination,
    };
  };

  const getProducts = async () => {
    const products = await db('products').select('*');
    const productWhithSlug = products.map(product => {
      const newProduct = {...product, slug: slug(product.name)}
      return newProduct;
    })

    return productWhithSlug;
  };


  const createProduct = async(product) => {
    const value = validation.validate(product, createSchema)
    await db('products').insert(value)
    return true;
  }
  const removeProduct = async(id) => {
    await db('products').where({id}).del()
  }
  
  const updateProduct = async(id, product) => {
    const value = validation.validate(product, createSchema)
    await db('products').where({ id }).update(value)
    return true;
  }

  return {
    getProductsByCategoryId,

    getProducts,
    getProductById,
    createProduct,
    removeProduct,
    updateProduct,
  };
};

module.exports = init;
