"use strict"
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

 var SlidesSchema = Schema({

   titulo: String,
   descripcion: String,
   imagen: String
 })

 module.exports = mongoose.model("Slides", SlidesSchema);