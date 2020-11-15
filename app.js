"use strict"

var express = require("express");
var bodyParser = require ("body-parser");

//Variable principal del servidor, esta trae el objeto express

var app = express();


 /* 
 Convertir peticiones http a json
 */
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());

 /**
 * CARGAR RUTAS
 */

 var rutaUsuarios = require("./rutas/usuarios.ruta");
 var rutaSlides = require("./rutas/slides.ruta");
 var rutaGalerias = require("./rutas/galerias.ruta");
 

 /**
  * RUTAS BASE
  */

  app.use("/api", rutaUsuarios);
  app.use("/api", rutaSlides);
  app.use("/api", rutaGalerias);

/**
 * Cabeceras HTTP
 */
   app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
        res.header("Access-Control-Allow-Request-Methods", "GET, POST, PUT, DELETE");
        res.header("Allow", "GET, POST, PUT, DELETE");
        next();
   });

  /**
   * Exportar el módulo para que este pueda ser usado en otro archivo
   */
  module.exports = app;
