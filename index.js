// Orden "use strict" para meter nuevas instrucciones de js
"use strict"

/**
 * LIBRERÍA MONGODB
 */
//Cargar librería mongoose para interactuar con la db
 var mongoose = require("mongoose")


 /**
  * Módulo de Express
  */

  var app = require("./app");
  // Esto es para establecer la variable de entorno PORT (puerto HTTP)
  var port = process.env.PORT || 1234;
 /**
  * CONEXIÓN A LA DB
  */
 
  mongoose.connect("mongodb+srv://SirHumber:Fernandezahft1701@sirhumber.xpmtf.mongodb.net/mongoDB", (error, res) =>{

  if (error) {
      
    throw error;
  }
  else{

    console.log("La conexión a la base de datos ha sido exitosa");

    app.listen(port, function(){

        console.log("Servidor del ApiRest en sirhumber.xpmtf.mongodb.net/mongoDB:" + port);
    })
  }

  })

