import debug from 'debug';
import PaymentService from '../services/payment.service';
import { ApplicationError, NotFoundError } from '../helpers/errors.helper';

import sagaService from '../services/saga.service';

const DEBUG = debug('dev');

export default {
  /**
   * Find all payment accounts
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  findAllPayments: async (req, res) => {
    try {
      const payments = await PaymentService.find();
      res.status(200).json({
        status: 'success',
        message: 'Payments successfully retrieved',
        data: { payments },
      });
    } catch (error) {
      DEBUG(error);
      throw new ApplicationError(500, error);
    }
  },
  /**
   * Find Payment by id
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  findPaymentById: async (req, res) => {
    try {
      const payment = await PaymentService.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Payment by id successfully retrieved',
        data: { payment },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  /**
   * Create payment
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  createPayment: async (req, res) => {
    try {
      const data = {
        ...req.body,
        vendorId: req.currentUser.id
      }

      const { productId, payed, buyerId } = data

      await sagaService(productId, payed, buyerId, req.currentUser)

      const payment = await PaymentService.create(data);
      res.status(200).json({
        status: 'success',
        message: 'Payment updated successfully',
        data: { payment },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  /**
   * Update payment by id
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  updatePayment: async (req, res) => {
    try {
      const payment = await PaymentService.update(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Payment updated successfully',
        data: { payment },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  /**
   * Delete payment by id
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  deletePayment: async (req, res) => {
    try {
      await PaymentService.delete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Payment deleted successfully',
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  },
  findPaymentByVendorId: async (req, res) => {
    try {
      const payments = await PaymentService.findByParams({ vendorId: req.params.vendorId });
      res.status(200).json({
        status: 'success',
        message: 'Payment by vendor id successfully retrieved',
        data: { payments },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  }
};
