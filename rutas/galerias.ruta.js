"use strict"

var express = require("express");

// Cargar el módulo del controlador

var ControladorGalerias = require("../controladores/galerias.controlador");

// Cargar el router de Express JS para crear rutas para la api

var api = express.Router();

// Requerir Middleware

var md_auth = require("../token/auth")

// Dependencia para subir archivos

var multipart = require("connect-multiparty")

var fichero = multipart({
    uploadDir: "./ficheros/galeria"
})

// Crear la ruta con el método GET para pasar el método que tendra que cargar la página cuando se haga la petición HTPP de esa ruta

api.get("/galerias", ControladorGalerias.pruebaGalerias);

// Ruta para subir un galeria utilizando el token de autenticación y la ruta donde se van a subir las imagenes

api.post("/crearFoto", [md_auth.autenticacion, fichero], ControladorGalerias.crearFoto);

api.get("/mostrarGaleria", ControladorGalerias.mostrarGaleria);

api.delete("/borrarFoto/:id", [md_auth.autenticacion, fichero], ControladorGalerias.borrarFoto);

api.get("/imagenGaleria/:imagen", ControladorGalerias.verImg);

//Exportamos el módulo api

module.exports = api;