import debug from 'debug';
import { NotFoundError } from '../helpers/errors.helper';

import externalValidator from '../externalValidator/index.validator'
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { createReservation, deleteReservation, getReservation } from '../models/reservation.model';

const DEBUG = debug('dev');

const postPayment = async (token, data) => {
  try {
    const { data: paymentData } = (await axios.post(process.env.PAYMENT_API_URL, data, {
      headers: {
        authorization: 'Bearer ' + token
      }
    })).data

    console.log({ paymentData })

    return paymentData.payment
  } catch (error) {
    DEBUG(error)
    throw new Error('Could not post payment')
  }
}

const patchProduct = async (token, { productId, quantity }) => {
  try {
    const { data: productData }  = (await axios.patch(`${process.env.PRODUCT_API_URL}/${productId}`, { quantity }, {
      headers: {
        authorization: 'Bearer ' + token
      }
    })).data

    return productData.product
  } catch (error) {
    DEBUG(error)
    throw new Error('Could not patch product')
  }
}

export default {
  /**
   * Create payment
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  createPayment: async (req, res) => {
    let productId = null

    try {
      const data = {
        vendorId: req.currentUser.id,
        ...req.body
      }
      productId = data.productId

      const quantityLeft = getReservation(productId)

      if (quantityLeft && Number(quantityLeft) === 0) {
        throw new Error('No quantity left of the product')
      }

      const { payed, buyerId } = data

      const token = jwt.sign(req.currentUser, process.env.JWT_KEY)

      const { validatePayment, validateUser } = externalValidator(token)

      const product = await validatePayment(productId, payed)
      await createReservation(productId, product.quantity - 1)

      if (buyerId !== req.currentUser?.id.toString()) {
        await validateUser(buyerId)
      }

      const payment = await postPayment(token, data);
      await patchProduct(token, { productId, quantity: product.quantity - 1 })
      res.status(200).json({
        status: 'success',
        message: 'Payment Created successfully',
        data: { payment },
      });
    } catch (error) {
      DEBUG(error);
      throw new NotFoundError(error.message);
    } finally {
      productId && deleteReservation(productId)
    }
  }
};
