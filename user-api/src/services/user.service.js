import { Op } from 'sequelize';
import User from '../models/user.model';

export default {
  find: async () => {
    return User.findAll();
  },
  findById: async (...args) => {
    const user = await User.findOne({
      where: {
        [Op.or]: args.map(({ field, value }) => ({ [field]: value }))
      }
    });

    if (user !== null) {
      return user;
    } else {
      throw new Error('User not found');
    }
  },
  create: (data) => User.create(data),
  update: async (id, data) => {
    const updatedUser = await User.update(data, {
      where: {
        _id: id
      }
    });

    if (updatedUser !== null) {
      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  },
  delete: async (id) => {
    const deletedUser = await User.destroy({ where: { _id: id } });

    if (deletedUser !== null) {
      return deletedUser;
    } else {
      throw new Error('User not found');
    }
  },
  checkExistingField: async (field, value) => {
    const exists = await User.findOne({ where: { [`${field}`]: value } })
    return exists;
  }
};
