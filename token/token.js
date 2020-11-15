"use strict"

// Dependencia para crear el token

var token = require("jwt-simple");

// Dependencia para hacer registro de fecha de creación del token y la fecha de expiración del mismo

var moment = require("moment");

var clave = "miclavesecretadeltoken";

/**
 * Método del Token
 */

 exports.crearToken = function(usuario){

    //Datos a codificar

    var cargarToken = {

        sub: usuario._id,
        nombre: usuario.usuario,
        // unix() formato timestamp actual
        now: moment().unix(),
        expiracion: moment().add(30, "days").unix()
    }

    return token.encode(cargarToken, clave);
 }