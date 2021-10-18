import express from 'express';
import paymentController from '../controllers/payment.controller';
import catchAsync from '../middlewares/catchAsync.middleware';
import { currentUser } from '../middlewares/customAuthMiddleware/currentUser.middleware';

const { findAllPayments, findPaymentById, createPayment, updatePayment, deletePayment, findPaymentByVendorId } = paymentController;

const router = express.Router();

router.get('/', currentUser, catchAsync(findAllPayments));
router.post('/', currentUser, catchAsync(createPayment));
router.get('/:id', currentUser, catchAsync(findPaymentById));
router.get('/byvendor/:vendorId', currentUser, catchAsync(findPaymentByVendorId));
router.patch('/:id', currentUser, catchAsync(updatePayment));
router.delete('/:id', currentUser, catchAsync(deletePayment));

export default router;
