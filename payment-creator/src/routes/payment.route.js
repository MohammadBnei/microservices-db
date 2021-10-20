import express from 'express';
import paymentController from '../controllers/payment.controller';
import catchAsync from '../middlewares/catchAsync.middleware';
import { currentUser } from '../middlewares/customAuthMiddleware/currentUser.middleware';

const { createPayment } = paymentController;

const router = express.Router();

router.post('/', currentUser, catchAsync(createPayment));

export default router;
