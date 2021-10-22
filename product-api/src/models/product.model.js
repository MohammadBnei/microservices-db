import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import { ApplicationError } from '../helpers/errors.helper';

dotenv.config();

// const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, '\n');

if (!process.env.JWT_KEY) {
  throw new ApplicationError(
    404,
    'Please provide a JWT_KEY as global environment variable',
  );
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  vendorId: { type: String, required: true },
  quantity: { type: Number, required: true }
});

ProductSchema.pre('validate', async function (next) {
  if (!this.value) return next;
  this.value = Math.floor(this.value * 100)
  next();
});

ProductSchema.methods.toJSON = function () {
  const product = this;

  const productObj = product.toObject();

  productObj.id = productObj._id; // remap _id to id
  productObj.value = productObj.value / 100;

  delete productObj._id;
  delete productObj.__v;
  return productObj;
};

ProductSchema.statics.checkExistingField = async function (field, value) {
  const product = this;

  return product.findOne({ [`${field}`]: value });
};

export default mongoose.model('Product', ProductSchema, 'products');
