"use strict"

// Método de prueba

function pruebaUsuarios(req, res){

    res.status(200).send({mensaje: "Probando el controlador de usuarios"});
}

/**
 * 
 * Método para crear usuarios, 
 * 
 * Importar modelo y dependencias de encriptación
 * 
 * Importamos el token
 */

var Usuarios = require("../modelos/usuarios.modelos");

var bcrypt = require("bcrypt-nodejs");

var token = require("../token/token");

function crearUsuarios(req, res){

    // Crear una instancia del objeto Usuarios (del modelo)
    var usuarios = new Usuarios();

    // Recogemos los parámetros que llegan por POST
    var parametros = req.body;
    
    usuarios.usuario = parametros.usuario;

    if(parametros.password){

        bcrypt.hash(parametros.password, null, null, function(err, hash){

            usuarios.password = hash;

            if (usuarios.usuario != null){

                usuarios.save((error, usuarioGuardado)=>{

                    if(error){

                        console.log(error);
                        res.status(500).send({mensaje: "Error al guardar el usuarios", error: error});                        
                    }
                    else{
            
                        res.status(200).send({usuarioGuardado});
                    }
                })
            }
        })
    }

    

}


// Ingreso de usuarios

function IngresoUsuarios(req, res) {
    
    var parametros = req.body;
    var usuario = parametros.usuario;
    var password = parametros.password;
    
    // BUscar un registro de la BD

    Usuarios.findOne({usuario: usuario}, (error, seleccionUsuario)=>{

        if (error) {
            
            res.status(500).send({mensaje: "Error al ingresar usuario"});
        }
        else{    

            if(!seleccionUsuario){

                res.status(400).send({mensaje: "El usuario no existe"});
            }
            else{

                bcrypt.compare(password, seleccionUsuario.password, function (error, ok){
                    
                    if (ok) {

                        //res.status(200).send({seleccionUsuario});

                        // Debemos enviar un parametro token en verdadero

                        if (parametros.token) {
                            
                            // Devolvemos un token de JWT
                            res.status(200).send({token: token.crearToken(seleccionUsuario), seleccionUsuario});
                        }
                    }
                    else{

                        res.status(400).send({mensaje: "No se ha podido ingresar"})
                    }
                })
            }

        }
       

        }
    )
}

/**
 * Actualizar Usuarios
 */

 function actualizarUsuarios(req, res) {
     
    var id = req.params.id;

    var actualizar = req.body;

    if(id != req.usuarioToken.sub){

        return res.status(500).send({mensaje: "No tienes permisos para actualizar este usuario"});

    }
    
    Usuarios.findByIdAndUpdate(id, actualizar, (error, usuarioActualizado)=>{

        if (error) {
            
            return res.status(404).send({mensaje: "No se ha podido actualizar el usuario"});
        }
        else{

            return res.status(200).send({usuarioActualizado});
        }
    });
 }
 /**
  * Borrar usuarios
  */

  function borrarUsuarios(req, res) {
      
    var id = req.params.id;

    if(id != req.usuarioToken.sub){

        return res.status(500).send({mensaje: "No tienes permisos para borrar este usuario"});

    }

    // Recorrer la base de datos

    Usuarios.findByIdAndRemove(id, (error, usuarioBorrado)=>{

        if (error) {
            
            return res.status(404).send({mensaje: "No se ha podido borrar el usuario"});
        }
        else{

            return res.status(200).send({usuarioBorrado});
        }
    })
    
  }
 
 /**
 * Exportar los métodos del módulo
 */

module.exports = {

    pruebaUsuarios,
    crearUsuarios,
    IngresoUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}