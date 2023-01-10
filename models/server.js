const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const pretty = require('express-prettify');
const router = require('../network/router');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        router(this.app);
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Formateo de respuestas json
        this.app.use(pretty({ query: 'pretty' }));

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        // Morgan - Escribe las peticiones http en consola en servidor
        this.app.use(morgan('dev'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;