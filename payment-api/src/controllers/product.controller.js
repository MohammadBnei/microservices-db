import debug from 'debug';
import ProductService from '../services/product.service';
import { ApplicationError, NotFoundError } from '../helpers/errors.helper';

const DEBUG = debug('dev');

export default {
  /**
   * Find all product accounts
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  findAllProducts: async (req, res) => {
    try {
      const products = await ProductService.find();
      res.status(200).json({
        status: 'success',
        message: 'Products successfully retrieved',
        data: { products },
      });
    } catch (error) {
      DEBUG(error);
      throw new ApplicationError(500, error);
    }
  },
  /**
   * Find Product by id
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  findProductById: async (req, res) => {
    try {
      const product = await ProductService.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Product by id successfully retrieved',
        data: { product },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  /**
   * Create product
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  createProduct: async (req, res) => {
    try {
      const data = {
        ...req.body,
        vendorId: req.currentUser.id
      }
      const product = await ProductService.create(data);
      res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: { product },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  /**
   * Update product by id
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  updateProduct: async (req, res) => {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: { product },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  /**
   * Delete product by id
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  deleteProduct: async (req, res) => {
    try {
      await ProductService.delete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully',
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  findProductByVendorId: async (req, res) => {
    try {
      const products = await ProductService.findByParams({ vendorId: req.params.vendorId });
      res.status(200).json({
        status: 'success',
        message: 'Product by vendor id successfully retrieved',
        data: { products },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  }
};
