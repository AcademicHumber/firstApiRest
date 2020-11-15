"use strict"

var express = require("express");

// Cargar el módulo del controlador

var ControladorSlides = require("../controladores/slides.controlador");

// Cargar el router de Express JS para crear rutas para la api

var api = express.Router();

// Requerir Middleware

var md_auth = require("../token/auth")

// Dependencia para subir archivos

var multipart = require("connect-multiparty")

var fichero = multipart({
    uploadDir: "./ficheros/slide"
})

// Crear la ruta con el método GET para pasar el método que tendra que cargar la página cuando se haga la petición HTPP de esa ruta

api.get("/slides", ControladorSlides.pruebaSlides);

// CRUD
// Ruta para subir un slide utilizando el token de autenticación y la ruta donde se van a subir las imagenes

api.post("/crearSlide", [md_auth.autenticacion, fichero], ControladorSlides.crearSlides);

api.get("/mostrarSlides", ControladorSlides.mostrarSlides);

api.put("/actualizarSlide/:id", [md_auth.autenticacion, fichero], ControladorSlides.actualizarSlides);

api.delete("/borrarSlide/:id", [md_auth.autenticacion, fichero], ControladorSlides.borrarSlide);

api.get("/imagenSlides/:imagen", ControladorSlides.verImg);

//Exportamos el módulo api

module.exports = api;