import jwt from 'jsonwebtoken';

export default {
  /**
   * Entry point controller for /api/v1
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  apiEntryPoint: async (req, res) => {
    try {
      res.status(200).json({
        status: 'success',
        message: 'API endpoint is ready!',
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Unexpected Error',
        error: err.toString(),
      });
    }
  },
  /**
   * This is a test controller to retrieve the product logged
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  checkProductLogged: async (req, res) => {
    try {
      // Return the product stored in the jwt cookie
      const cookiePayload = await jwt.verify(
        req.cookies?.jwt,
        process.env.JWT_KEY,
      );
      //n                    console.log(req);
      res.status(200).json({
        status: 'success',
        message: 'User logged retrieved',
        productInCookie: cookiePayload,
        productInCustomMiddleware: req.currentUser,
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: 'Unexpected Error',
        error: error.toString(),
      });
    }
  },
};
