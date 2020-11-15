"use strict"

// Método de prueba

function pruebaSlides(req, res){

    res.status(200).send({mensaje: "Probando el controlador de slides"});
}

/**
 * Importar el modelo
 */

 var Slides = require("../modelos/slides.modelo");

 // Dependencia pra poder borrar archivos

const fs = require("fs");
const path = require("path")

/**
 * Método para crear slides
 */

 function crearSlides(req, res){

    var slides = new Slides();

    var parametros = req.body;

    slides.titulo = parametros.titulo;
    slides.descripcion = parametros.descripcion;

    if(req.files){

        var rutaImagen = req.files.imagen.path;
        var nombreImagen = rutaImagen.split("\\");

        slides.imagen = nombreImagen[2];

        if (slides.titulo != null && slides.descripcion != null) {
            
            slides.save((error, slideGuardado)=>{

                if (error) {
                    
                    res.status(500).send({mensaje: "Error al guardar el slide"})
                }
                else{
                    if (!slideGuardado) {
                        
                        res.status(404).send({mensaje: "No se ha podido guardar el slide"})
                    }
                    else{

                        res.status(200).send({slideGuardado});
                    }
                }
            });
        }
    }
    
 }

 /**
  * Mostrar Slides
  */

  function mostrarSlides(req, res) {
      
    Slides.find((error, mostrandoSlides)=>{

        if (error) {
            
            res.status(500).send({mensaje: "Error en la petición"});
        }
        else{

            res.status(200).send({mostrandoSlides})
        }
    }).sort("_id");
  }

  /**
   * Actualizar Slides
   * 
   * Recibe:
   * titulo
   * descripcion
   * rutaImagenActual
   * ActualizarImagen
   * imagen (si se actualizará)
   */

   function actualizarSlides(req, res) {

    var slides = Slides();
       
    var id = req.params.id;
    var parametros = req.body;

    slides.titulo = parametros.titulo;
    slides.descripcion = parametros.descripcion;

    var cambioImagen = false;

    if(parametros.actualizarImagen == "0"){

        slides.imagen = parametros.rutaImagenActual;
        cambioImagen = true
    }
    else{

        if (req.files) {
            
            var imagenRuta = req.files.imagen.path;
            var nombreImagen = imagenRuta.split("\\");

            slides.imagen = nombreImagen[2];

            var antiguaImagen = parametros.rutaImagenActual;
            var rutaImagen = "./ficheros/slide/" + antiguaImagen;

            fs.unlink(rutaImagen,(error)=>{
                if (error) {
                    
                    throw error;
                }
            });
        }

        cambioImagen = true;
    }

    if (cambioImagen) {
        
        if (slides.titulo != null && slides.descripcion != null && slides.imagen != null){

            var actualizar = {

                "titulo": slides.titulo,
                "descripcion": slides.descripcion,
                "imagen": slides.imagen
            }

            Slides.findByIdAndUpdate(id, actualizar, (error, slideActualizado)=>{

                if(error){

                    res.status(404).send({mensaje: "No se ha podido actualizar el slide"});
                }
                else{

                    if(!slideActualizado){

                        res.status(404).send({mensaje: "No se ha podido actualizar el slide"});
                    }
                    else{

                        res.status(200).send({slideActualizado});
                    }

                    
                }
            })
        }
    }    
    
   }

   /**
   * Borrar Slides
   */

   function borrarSlide(req, res){

    var id = req.params.id;

    Slides.findOne({_id: id}, (error, capturarSlide)=>{

        if (error) {
            
            res.status(500).send({mensaje: "Error al capturar el Slide"});
        }
        else{

            if(!capturarSlide){

                res.status(404).send({mensaje: "No se pudo capturar el Slide"});
            }
            else{

                var antiguaImagen = capturarSlide.imagen;
                var rutaImagen = "./ficheros/slide/" + antiguaImagen;
                fs.unlink(rutaImagen,(error)=>{
                    if (error) {
                        
                        throw error;
                    }                    
                });

            }
        }
    });

    setTimeout(function(){

        Slides.findByIdAndRemove(id, (error, slideBorrado)=>{

            if (error) {
                
                res.status(500).send({mensaje: "Error al borrar el Slide"});
            }
            else{
    
                if(!slideBorrado){
    
                    res.status(404).send({mensaje: "Error al borrar el Slide"});
                }
                else{
    
                    res.status(200).send({slideBorrado});
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
    var rutaImagen = "./ficheros/slide/" + imagen;

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
    pruebaSlides,
    crearSlides,
    mostrarSlides,
    actualizarSlides,
    borrarSlide,
    verImg
}