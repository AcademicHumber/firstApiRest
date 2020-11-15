"use strict"

var express = require("express");

// Cargar el módulo del controlador

var ControladorUsuarios = require("../controladores/usuarios.controlador");

// Cargar el router de Express JS para crear rutas para la api

var api = express.Router();

// Requerir Middleware

var md_auth = require("../token/auth")

// Crear la ruta con el método GET para pasar el método que tendra que cargar la página cuando se haga la petición HTPP de esa ruta

api.get("/prueba-usuarios", md_auth.autenticacion, ControladorUsuarios.pruebaUsuarios);

// Crear la ruta para crear usuarios, utilizando el método POST

api.post("/crearUsuarios", ControladorUsuarios.crearUsuarios);

// Ingreso de usuarios
api.post("/login", ControladorUsuarios.IngresoUsuarios);

// Ingreso de usuarios
api.put("/actualizarUsuario/:id", md_auth.autenticacion, ControladorUsuarios.actualizarUsuarios);

// Borrar Usuarios

api.delete("/borrarUsuario/:id", md_auth.autenticacion, ControladorUsuarios.borrarUsuarios);

//Exportamos el módulo api

module.exports = api;