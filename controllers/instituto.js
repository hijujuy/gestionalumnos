const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../network/response')

const usuario = { id: 1 }
const campos_instituto = {
  nombre:     true,
  cue:        true,
  telefono:   true,
  url:        true,
  direccion:  true,
  correo:     true
}

/**
 * @method
 * @description Inserta un nuevo instituto en la BD.
 * @param{string} nombre dato del body
 * @param{integer} cue dato del body
 * @param{string} telefono dato del body
 * @param{string} url dato del body
 * @param{string} direccion dato del body
 * @param{string} correo dato del body
 */
const save = async(req, res) => {
  const {
    nombre,
    cue,
    telefono,
    url,
    direccion,
    correo
  } = req.body

    try {
        const result = await prisma.institutos.create({
            select: campos_instituto,
            data: {
                nombre,
                cue: Number(cue),
                telefono,
                url,
                direccion,
                correo,
                id_usuario_creador:     usuario.id,
                id_usuario_modificador: usuario.id                
            },
        })
        response.success(req, res, result, 201)
    }
    catch (error) {
        response.error(req, res, "Intentelo nuevamente en cinco minutos.", 500, error)
    }

}

const actualize = async (req, res) => {
    const {
      nombre,
      cue,
      telefono,
      url,
      direccion,
      correo
    } = req.body

    try {        
        const result = await prisma.institutos.update({
            select: campos_instituto,
            where: { 
                id: Number(req.params.id)
            },
            data: {
                nombre,
                telefono,
                url,
                direccion,
                correo,
                id_usuario_modificador: usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intentelo nuevamente en cinco minutos.", 500, error)
    }

}

const desable = async(req, res) => {
    
    try {
        const result = await prisma.institutos.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                estado: false,
                id_usuario_modificador: usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intentelo nuevamente en cinco minutos.", 500, error)
    }   
}

const enable = async(req, res) => {
    
    try {
        const result = await prisma.institutos.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                estado: true,
                id_usuario_modificador: usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intentelo nuevamente en cinco minutos.", 500, error)
    }   

}

const getAll = async (req, res) => {

    try {        
        const result = await prisma.institutos.findMany();
        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intentelo nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
  const id = Number(req.params.id)
  
  try {
    const result = await prisma.institutos.findUnique({
      where: {
        id: id
      },
    })

    response.success(req, res, result, 200)
  }
  catch (e) {
      response.error(req, res, "Intentelo nuevamente en cinco minutos.", 500, e)
  }
}

module.exports = {
    save,
    actualize,
    desable,
    enable,
    getAll,
    getById,
}