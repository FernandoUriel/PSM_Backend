const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const NoticiaSchema = new Schema({
  title: { type: String },
  author: { type: String },
  shortBody: { type: String },
  body: { type: String }
})

const NoticiaModel = mongoose.model('noticias', NoticiaSchema)

module.exports = NoticiaModel
