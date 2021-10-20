import express from 'express';
import indexController from '../controllers/index.controller';

import catchAsync from '../middlewares/catchAsync.middleware';
import { currentUser } from '../middlewares/customAuthMiddleware/currentUser.middleware';

const { apiEntryPoint, checkProductLogged } = indexController;

const router = express.Router();

router.get('/', catchAsync(apiEntryPoint));
router.get('/check-user-logged', currentUser, catchAsync(checkProductLogged));

/**
 import asyncHandler from 'express-async-handler';
 router.get(
 '/',
 Multer.single('file'),
 asyncHandler(async (req, res, next) => {
    const file = await req.file;
    res.status(200).json({
      status: 'success',
      message: 'API endpoint is ready',
      file: file,
    });
  }),
 );

 // return next(err);
 */

export default router;
