import Sequelize from 'sequelize';
import sequelize from '../config/database.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { ApplicationError } from '../helpers/errors.helper';

dotenv.config();

// const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, '\n');

if (!process.env.JWT_KEY) {
  throw new ApplicationError(
    404,
    'Please provide a JWT_KEY as global environment variable',
  );
}
const jwtKey = process.env.JWT_KEY;

const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: {
        msg: 'Must be a Valid email',
      },
    },
    lowercase: true,
    unique: true,
    required: [true, "Email can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    trim: true,
  },
  password: {
    type: Sequelize.STRING, required: true, minlength: 8,
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    required: false,
  },
  resetPasswordExpires: {
    type: Sequelize.DATE,
    required: false,
  }
})

User.prototype.toJSON = function () {
  const user = this;

  const userObj = user.dataValues;

  delete userObj.password;
  delete userObj.__v;
  return userObj;
}

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

User.prototype.generateVerificationToken = function () {
  return jwt.sign({ id: this.id, email: this.email }, jwtKey, {
    expiresIn: '10d',
    // algorithm: 'RS256', // use user if set public and private keys
  });
}

User.prototype.generatePasswordResetToken = async function () {
  this.resetPasswordToken = await crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
}

User.addHook('beforeSave', async (user) => {
  user.password = await bcrypt.hash(
    user.password,
    parseInt(process.env.HASH, 10),
  );
})

export default User
