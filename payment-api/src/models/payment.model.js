import mongoose, { Schema } from 'mongoose';

const PaymentSchema = new Schema({
  payed: { type: Number, required: true },
  paymentId: { type: String, required: true },
  buyerId: { type: String, required: true }
}, {
  timestamps: true
});

PaymentSchema.pre('validate', async function (next) {
  if (!this.value) return next;
  this.value = Math.floor(this.value * 100)
  next();
});

PaymentSchema.methods.toJSON = function () {
  const payment = this;

  const paymentObj = payment.toObject();

  paymentObj.id = paymentObj._id; // remap _id to id
  paymentObj.payed = paymentObj.payed / 100;

  delete paymentObj._id;
  delete paymentObj.__v;
  return paymentObj;
};

PaymentSchema.statics.checkExistingField = async function (field, value) {
  const payment = this;

  return payment.findOne({ [`${field}`]: value });
};

export default mongoose.model('Payment', PaymentSchema, 'payments');
