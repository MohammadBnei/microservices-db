import Payment from '../models/reservation.model';

export default {
  find: async () => {
    return Payment.find();
  },
  /**
   * 
   * @param {string} query The to run by
   * @returns 
   */
  findByParams: async (query) => {
    const payment = await Payment.find(query);

    if (payment !== null) {
      return payment;
    } else {
      throw new Error('Payment not found');
    }
  },
  findById: async (id) => {
    const payment = await Payment.findById(id).exec();

    if (payment !== null) {
      return payment;
    } else {
      throw new Error('Payment not found');
    }
  },
  create: async (data) => {
    const newPayment = await Payment.create(data);

    return newPayment;
  },
  update: async (id, data) => {
    const updatedPayment = await Payment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (updatedPayment !== null) {
      return updatedPayment;
    } else {
      throw new Error('Payment not found');
    }
  },
  delete: async (id) => {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (deletedPayment !== null) {
      return deletedPayment;
    } else {
      throw new Error('Payment not found');
    }
  },
};
