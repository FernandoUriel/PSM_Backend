const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')

const cors = require('cors')
const mongoose = require('mongoose')

const passport = require('./passport')

var indexRouter = require('./routes/index')
var usuariosRouter = require('./routes/usuarios')

var dbURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/retouni'

mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.set('debug', true);
mongoose.connection.on('error', error => console.log(error));

mongoose.connection.once('open', function(){
  console.log("Connected to DB");
});

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api', passport.authenticate('jwt', { session: false }), usuariosRouter)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    status: err.status,
    error: err.message,
    stack: err.stack
  })
})

module.exports = app
