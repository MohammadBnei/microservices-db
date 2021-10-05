import debug from 'debug';
import Sequelize from 'sequelize';
import logger from '../utils/logger.utils';

const DEBUG = debug('dev');

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
})

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    DEBUG(err);
  });

if (process.env.NODE_ENV === 'production') {

} else {
  sequelize.sync()
    .then(() => {
      logger.info('Database has been successfully synced.');
    })
}

export default sequelize