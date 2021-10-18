import Product from '../models/product.model';

export default {
  find: async () => {
    return Product.find();
  },
  /**
   * 
   * @param {string} query The to run by
   * @returns 
   */
  findByParams: async (query) => {
    const product = await Product.find(query);

    if (product !== null) {
      return product;
    } else {
      throw new Error('Product not found');
    }
  },
  findById: async (id) => {
    try {
      const product = await Product.findById(id).exec();

      if (product !== null) {
        return product;
      } else {
        throw new Error();
      }
    } catch (error) {
      DEBUG(error);
      throw new Error('Product not found');
    }
  },
  create: async (data) => {
    const newProduct = await Product.create(data);

    return newProduct;
  },
  update: async (id, data) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (updatedProduct !== null) {
      return updatedProduct;
    } else {
      throw new Error('Product not found');
    }
  },
  delete: async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct !== null) {
      return deletedProduct;
    } else {
      throw new Error('Product not found');
    }
  },
};
