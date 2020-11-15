"use strict"

// Método de prueba

function pruebaGalerias(req, res){

    res.status(200).send({mensaje: "Probando el controlador de galerias"});
}

// Dependencia pra poder borrar archivos

var fs = require("fs");
const path = require("path");

// Método de creación de foto

var Galeria = require("../modelos/galeria.modelo");

function crearFoto(req, res){

    var galeria = new Galeria();  

    if(req.files){

        var rutaFoto = req.files.foto.path;

        /**
         * Hay un bug que el split() no sirve en servidor, así que para esta situacion se toman los ultimos
         * 28 caracteres de la ruta, ya que esos pertenecen al archivo
         */
        // var nombreFoto = rutaFoto.split("\\");       

        galeria.foto = rutaFoto.substr(-28);        
            
            galeria.save((error, fotoGuardada)=>{

                if (error) {
                    
                    res.status(500).send({mensaje: "Error al guardar la foto"})
                }
                else{
                    if (!fotoGuardada) {
                        
                        res.status(404).send({mensaje: "No se ha podido guardar la foto"})
                    }
                    else{

                        res.status(200).send({fotoGuardada});
                    }
                }
            });
    
    }
}

 /**
  * Mostrar galeria
  */

 function mostrarGaleria(req, res) {
      
    Galeria.find((error, mostrandoFotos)=>{

        if (error) {
            
            res.status(500).send({mensaje: "Error en la petición"});
        }
        else{

            res.status(200).send({mostrandoFotos})
        }
    }).sort("_id");
  }

  /**
   * Borrar Foto
   */

  function borrarFoto(req, res){

    var id = req.params.id;

    Galeria.findOne({_id: id}, (error, capturarFoto)=>{

        if (error) {
            
            res.status(500).send({mensaje: "Error al capturar la foto"});
        }
        else{

            if(!capturarFoto){

                res.status(404).send({mensaje: "Error al capturar la foto"});
            }
            else{

                var antiguaImagen = capturarFoto.foto;
                var rutaImagen = "./ficheros/galeria/" + antiguaImagen;
                fs.unlink(rutaImagen,(error)=>{
                    if (error) {
                        
                        throw error;
                    }                    
                });
            }
        }
    });

    setTimeout(function(){

        Galeria.findByIdAndRemove(id, (error, fotoBorrada)=>{

            if (error) {
                
                res.status(500).send({mensaje: "Error al borrar la foto"});
            }
            else{
    
                if(!fotoBorrada){
    
                    res.status(404).send({mensaje: "Error al borrar la foto"});
                }
                else{
    
                    res.status(200).send({fotoBorrada});
                }
            }
        })
        
    }, 1000);
    
   }

      /**
    * Ver imagen
    */
   function verImg(req, res){

    var imagen = req.params.imagen;
    var rutaImagen = "./ficheros/galeria/" + imagen;

    fs.stat(rutaImagen, (error, imagen)=>{
        
        if(error){
            
            res.status(500).send({mensaje: "Hubo un error buscando la imagen"})
        }
        else{

            if(!imagen){

                res.status(404).send({mensaje: "La imagen no existe"});
            }
            else{

                res.sendFile(path.resolve(rutaImagen));
            }
        }
    })
   }
/**
 * Exportar los métodos del módulo
 */

module.exports = {    
    pruebaGalerias,
    crearFoto,
    mostrarGaleria,
    borrarFoto,
    verImg
}