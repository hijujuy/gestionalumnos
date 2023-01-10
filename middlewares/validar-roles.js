const { response } = require('express');

const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})
prisma.$on('query', (e) => {
  console.log(e)
})

const esAdminRole = async( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el token primero'
        });
    }

    const { id } = req.usuario[0];
    const permisos = await prisma.$queryRaw`SELECT U.correo, R.nombre_rol FROM public.permisos P JOIN public.roles R ON P.id_rol = R.id JOIN public.usuarios U ON P.id_usuario = U.id WHERE P.id_usuario = ${id}`;

    const esAdmin = permisos.find(element => element.nombre_rol === 'ADMINISTRADOR');
    if ( esAdmin) {
      next();
    } else {
      return res.status(401).json({
        msg: 'No es administrador-Permiso denegado.'
      });
    }
}


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRole
}