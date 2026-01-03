const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dbClient = require('../db'); // adjust path
const redisClient = require("./redis.mjs");
const { default: status } = require('http-status');

// 🔐 Local Strategy
passport.use(
    'local',
  new LocalStrategy(
    {
      usernameField: 'login_id', // login_id OR email
      passwordField: 'password'
    },
    async (login_id, password, done) => {
      try {
        const result = await dbClient.query(
          'SELECT * FROM auth_signin_by_login_id($1)',
          [login_id]
        );

        if (result.rows.length === 0) {
          return done(null, false, { message: 'User not found' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }

        // ✅ User data to store in session
        return done(null, user);

      } catch (err) {
        return done(err);
      }
    }
  )
);

// 🧠 Store user in session
passport.serializeUser((user, done) => {
    console.log('Serialize', user);
  done(null, user); // storing object
});

// 🧠 Retrieve user from session
passport.deserializeUser((user, done) => {
    console.log('DESerialize', user);
  done(null, user);
});

passport.isLoggedIn = function (req, res, next) {

    try{
    if (req.isAuthenticated()) {
      return next();
    }
  
    let retVal = {
      success: false,
      message: "Sorry,You are not Authorized.!",
    };
    res.status(401).send(retVal);
  }catch(error){
    console.log(error);
    let err = new APIError("You are not authorized please login first.", status.UNAUTHORIZED, true,true);
    next(err);
  }
  };
module.exports = passport;
