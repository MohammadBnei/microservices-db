import passport from 'passport';
import { Strategy } from 'passport-local';
import debug from 'debug';
import User from '../../services/user.service';

const DEBUG = debug('dev');

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

passport.serializeUser((user, done) => {
  /* Store only the id in passport */
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }, (err, user) => {
    done(null, user);
  });
});

passport.use(
  'login',
  new Strategy(authFields, async (req, email, password, cb) => {
    try {
      const user = await User.findById({ field: 'email', value: email }, { field: 'username', value: email });

      if (!user || !user.password) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      const checkPassword = await user.comparePassword(password);

      if (!checkPassword) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, user, { message: 'Logged In Successfully' });
    } catch (err) {
      DEBUG(err);
      return cb(null, false, { statusCode: 400, message: err.message });
    }
  }),
);

passport.use(
  'signup',
  new Strategy(authFields, async (req, email, password, cb) => {
    try {
      const checkEmail = await User.checkExistingField('email', email);

      if (checkEmail) {
        return cb(null, false, {
          statusCode: 409,
          message: 'Email already registered, log in instead',
        });
      }

      const checkUserName = await User.checkExistingField(
        'username',
        req.body.username,
      );
      if (checkUserName) {
        return cb(null, false, {
          statusCode: 409,
          message: 'Username exists, please try another',
        });
      }

      const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });


      return cb(null, newUser);
    } catch (err) {
      DEBUG(err);
      return cb(null, false, { statusCode: 400, message: err.message });
    }
  }),
);

/**
 * The password Reset method is with a token generated
 */
passport.use(
  'reset-password',
  new Strategy(authFields, async (req, email, password, cb) => {
    try {
      /**
       * Deprecated in favour of password reset with token
       * @type {*}
       */
      // const user = await User.findById({
      //   $or: [{ email }, { username: email }],
      // });
      // if (!user) {
      //   return cb(null, false, {
      //     message: 'No account with this email found.',
      //   });
      // }
      // const checkPassword = await user.comparePassword(password);
      //
      // if (!checkPassword) {
      //   return cb(null, false, {
      //     message: 'Old password is incorrect.',
      //   });
      // }
      const { token } = await req.body;

      const user = await User.findById({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return cb(null, false, {
          message: 'Password reset token is invalid or has expired.',
        });
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return cb(null, user, { message: 'Password Changed Successfully' });
    } catch (err) {
      DEBUG(err);
      return cb(null, false, { statusCode: 400, message: err.message });
    }
  }),
);
