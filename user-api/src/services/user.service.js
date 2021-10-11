import { Op } from 'sequelize';
import User from '../models/user.model';

export default {
  find: async () => {
    return User.findAll();
  },
  findById: async (...args) => {
    const user = await User.findOne({
      where: {
        [Op.or]: args
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
    const userToUpdate = await User.findByPk(id)
    if (userToUpdate === null) throw new Error('User not found');
    Object.assign(userToUpdate, data)
    return userToUpdate;
  },
  delete: async (id) => {
    const deletedUser = await User.destroy({ where: { id } });

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
