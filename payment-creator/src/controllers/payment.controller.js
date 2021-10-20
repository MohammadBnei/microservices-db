import debug from 'debug';
import PaymentService from '../services/payment.service';
import { ApplicationError, NotFoundError } from '../helpers/errors.helper';

import externalValidator from '../externalValidator/index.validator'
import jwt from 'jsonwebtoken';
import axios from 'axios';

const DEBUG = debug('dev');

const postPayment = async (token, data) => {
  const { payment } = (await axios.post(process.env.PAYMENT_URL, data, {
    headers: {
      authorization: 'Bearer ' + token
    }
  })).data

  return payment
}

export default {
  /**
   * Create payment
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  createPayment: async (req, res) => {
    try {
      const data = {
        vendorId: req.currentUser.id,
        ...req.body
      }

      const { productId, payed, buyerId } = data

      const token = jwt.sign(req.currentUser, process.env.JWT_KEY)

      const { validatePayment, validateUser } = externalValidator(token)

      await validatePayment(productId, payed)
      if (buyerId !== req.currentUser?.id.toString()) {
        await validateUser(buyerId)
      }

      const payment = await postPayment(token, data);
      res.status(200).json({
        status: 'success',
        message: 'Payment Created successfully',
        data: { payment },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    }
  }
};
