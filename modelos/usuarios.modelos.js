"use strict"

/**
 * Requerir dependencia para acceder a la BD
 */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

/**
 * Esquema con los atributos
 */

 var UsuariosSchema = Schema({

    usuario: String,
    password: String
 })

 /**
  * Objeto que va a poder ser instanciado y automaticamente le asignamos los valores del esquema
  */
 module.exports = mongoose.model("Usuarios", UsuariosSchema);