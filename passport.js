const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  JWT = require('./JWT'),
  UserModel = require('./models/usermodel')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.secretOrKey,
  issuer: JWT.issuer,
  audience: JWT.audience
}

passport.use(
  new JwtStrategy(options, function(jwtPayload, done) {
    UserModel.findOne({ username: jwtPayload.username}, (err, user) => {
      if (err) return done(err, false)
      if (user) return done(null, user)
      return done(null, false)
    })
  })
)

module.exports = passport
