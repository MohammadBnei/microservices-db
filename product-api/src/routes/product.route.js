import express from 'express';
import productController from '../controllers/product.controller';
import catchAsync from '../middlewares/catchAsync.middleware';
import { currentUser } from '../middlewares/customAuthMiddleware/currentUser.middleware';

const { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct, findProductByVendorId } = productController;

const router = express.Router();

router.get('/', currentUser, catchAsync(findAllProducts));
router.post('/', currentUser, catchAsync(createProduct));
router.get('/:id', currentUser, catchAsync(findProductById));
router.get('/byvendor/:vendorId', currentUser, catchAsync(findProductByVendorId));
router.patch('/:id', currentUser, catchAsync(updateProduct));
router.delete('/:id', currentUser, catchAsync(deleteProduct));

export default router;
