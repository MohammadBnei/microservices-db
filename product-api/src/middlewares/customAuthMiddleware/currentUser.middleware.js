import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const currentUser = (req, res, next) => {
  // if (!req.cookies?.jwt && !req.headers?.authorization) {
  //   return next();
  // }
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const jwtFromBearer = req.headers?.authorization?.split(' ');

      const jwtToken = jwtFromBearer[1];

      const payload = jwt.verify(jwtToken, process.env.JWT_KEY);

      req.currentUser = payload;
    } else if (req.cookies.jwt) {
      const payload = jwt.verify(req.cookies.jwt, process.env.JWT_KEY);

      req.currentUser = payload;
    } else {
      throw new Error('No jwt token provided')
    }
  } catch (error) {
    return next(error);
  }
  return next();
};
