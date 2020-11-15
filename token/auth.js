"use strict"

var token = require("jwt-simple");
var moment = require("moment");
var clave = "miclavesecretadeltoken"

/**
 * Método de autenticación
 * 
 * Creamos un Middleware
 */

 exports.autenticacion = function (req, res, next) {
     
    // Pasamos el token por una cabecera de autenticación

    if (!req.headers.authorization){

        return res.status(403).send({mensaje: "La petición no tiene cabecera de autenticación"});
    }
    else{

        // Quitamos las comillas al token con el metodo replace

        var tokenEnviado = req.headers.authorization.replace(/['"]+/g, '');

        // Sentencia de manejo de excepciones

        try {

            var cargarToken = token.decode(tokenEnviado, clave);

            if (cargarToken.expiracion <= moment().unix()) {
                
                return res.status(403).send({mensaje: "El token ha expirado"});
            }
            
        } catch (error) {

            console.log(error);
            return res.status(403).send({mensaje: "El token no es válido"});           
        }

        req.usuarioToken = cargarToken;

        next();
    }
 }

