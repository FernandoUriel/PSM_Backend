const express = require('express'),
  createError = require('http-errors'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  JWT = require('../JWT'),
  UserModel = require('../models/usermodel')

router.get('/', function(req, res, next) {
  res.json({ message: 'ok' })
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  UserModel.findOne({ username: req.body.username}, (err, user) => {
    if (err) return next(createError(500, 'Error en la base de datos'))
    else if (user) {
      user.isValidPassword(req.body.password, isMatch => {
        if (!isMatch) return next(createError(400, 'Bad Credentials'))
        let options = { issuer: JWT.issuer, audience: JWT.audience }
        let payload = {
          username: user.username,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10
        }
        let token = jwt.sign(payload, JWT.secretOrKey, options)
        return res.json({ message: 'ok', token })
      })
    } else return next(createError(400, 'Bad Credentials'))
  })
})

router.post('/signup',function(req,res,next){
  var user = new UserModel({
    username:req.body.username,
    password:req.body.password
  })
  user.save(function(err,user){
    if(err) return next(createError(500, 'Error en la base de datos'))
    return res.json(username)
  });
})

module.exports = router
