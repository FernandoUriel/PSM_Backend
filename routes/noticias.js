const express = require('express'),
  router = express.Router(),
  createError = require('http-errors'),
  NoticiaModel = require('../models/noticiamodel')

router.get('/noticias', function(req, res, next) {
  NoticiaModel.find((err, result) => {
    if (err) return next(createError(500, 'Error al encontrar las noticias'))
    res.json(result)
  })
})

module.exports = router
