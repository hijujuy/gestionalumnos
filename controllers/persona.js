const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../network/response')

const campos_persona = {
  id:true,
  nombre: true,                 
  apellido: true,
  dni: true,
  fecha_nacimiento: true,
  cuil: true,
  telefono: true,
  correo: true, 
  calle: true,
  nro_calle: true,
  manzana: true,
  lote: true,
  piso: true,
  departamento: true,
  barrio: true,
  estado_civil: {
    select: {
      id: true,
      nombre: true,
    }
  },
  genero: {
    select: {
      id: true,
      nombre: true,
    }
  },
  nacionalidades: {
    select: {
      id: true,
      nombre: true,
    }
  },
  tipo_documento: {
    select: {
      id: true,
      nombre: true,
    }
  },
  localidades: {
    select: {
      id: true,
      nombre: true,
    }
  }
}

const save = async(req, res) => {
    req.usuario = { id: 1 }

    let {              
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
      correo,
      calle,
      manzana,
      lote,
      piso,
      departamento,
      barrio,
      id_localidad,
      dni,
      cuil,
      nro_calle,
      id_nacionalidad,
      id_estado_civil,
      id_tipo_doc,
      id_genero,
    } = req.body

    try {
        const result = await prisma.personas.create({
          select: campos_persona,
          data: {
            nombre,                 
            apellido,
            fecha_nacimiento:       new Date(fecha_nacimiento),
            telefono,
            correo,
            id_usuario_creador:     req.usuario.id,
            id_usuario_modificador: req.usuario.id,
            calle,
            manzana,
            lote,
            piso,
            departamento,
            barrio,
            dni,           
            cuil,
            nro_calle,  
            estado_civil: { 
              connect: { 
                id: Number(id_estado_civil)
              }
            },
            tipo_documento: { 
              connect: { 
                id: Number(id_tipo_doc)
              }
            },
            nacionalidades: {
              connect: {
                id: Number(id_nacionalidad)
              }
            },
            genero: { 
              connect: {
                id: Number(id_genero)
              }
            },
            localidades: {
              connect: {
                id: Number(id_localidad)
              }
            }
          },
        })
        response.success(req, res, result, 201)
    }
    catch (error) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }

}

const actualize = async(req, res) => {
  req.usuario = { id: 1 }
  
  const {
    nombre,
    apellido,
    dni,
    fecha_nacimiento,
    cuil,
    telefono,
    correo,
    calle,
    nro_calle,
    manzana,
    lote,
    piso,
    departamento,
    barrio,
    id_estado_civil,
    id_tipo_doc,
    id_nacionalidad,
    id_genero,
    id_localidad
  } = req.body
                    
  try {
    const result = await prisma.personas.update({
      where: {
        id: Number(req.params.id)
      },
      select: campos_persona,
      data: {
        nombre,
        apellido,
        dni,
        fecha_nacimiento:       new Date(fecha_nacimiento),
        cuil,
        telefono,
        correo,
        calle,
        nro_calle,
        manzana,
        lote,
        piso,
        departamento,
        barrio,
        id_estado_civil : Number(id_estado_civil),
        id_tipo_doc : Number(id_tipo_doc),
        id_nacionalidad : Number(id_nacionalidad),
        id_genero : Number(id_genero),
        id_localidad : Number(id_localidad),
        id_usuario_modificador: req.usuario.id,
      },
    })
    response.success(req, res, result, 200)
  }
  catch (error) {
    response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }

}

const desable = async(req, res) => {
    req.usuario = { id: 3 }

    try {
        const result = await prisma.personas.update({
            where: {
              id: Number(req.params.id)
            },
            select: {
              id: true,
              estado: true,
            },
            data: {
              estado:                 false,
              id_usuario_modificador: req.usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }
}

const enable = async(req, res) => {
  req.usuario = { id: 2 }

  try {
      const result = await prisma.personas.update({
          where: {
            id: Number(req.params.id)
          },
          select: {
            id: true,
            estado: true,
          },
          data: {
            estado:                 true,
            id_usuario_modificador: req.usuario.id,
          },
      })
      response.success(req, res, result, 200)
  }
  catch (error) {
      response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }
}

const getAll = async(req, res) => {
    
    try {        
        const list = await prisma.personas.findMany({
            select: campos_persona,
        })        
        response.success(req, res, list, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }  
}

const getById = async(req, res) => {
    
    const id = Number(req.params.id)

    try {
        if (Number.isInteger(id)) {
            const persona = await prisma.personas.findUnique({
              where: {
                  id: id
              },              
              select: campos_persona
            });
    
            if (!persona) {
                response.error(req, res, [], 404, { table: 'personas', id: id })
            }
            else {
                response.success(req, res, persona, 200)
            }
        }
        else {
            response.error(req, res, [], 400, `ID parametro de ruta no es numero entero valido`)
        }       
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }

}


module.exports = {
    save,
    actualize,
    desable,
    enable,
    getAll,
    getById,
};