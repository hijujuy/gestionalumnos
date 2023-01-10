const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const save = async(req, res) => {
  
  try {
    const result = await prisma.provincias.create({
      data: {
        nombre: req.body.nombre,        
        id_usuario_creador:     usuario.id,
        id_usuario_modificador: usuario.id
      },
    })
    response.success(req, res, result, 201)
  }
  catch (error) {
    response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }

}

const actualize = async (req, res) => {

    try {        
        const result = await prisma.provincias.update({
            where: { 
                id: Number(req.params.id) 
            },
            data: {
              nombre: req.body.nombre,
              id_usuario_modificador: usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }

}

const getAll = async (req, res) => {
  try {        
    const result = await prisma.provincias.findMany()
    
    response.success(req, res, result, 200)
  }
  catch (e) {
      response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
  }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.provincias.findUnique({
            where: {
                id: id
            },
        });
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }

}

module.exports = {
    save,
    actualize,
    getAll,
    getById,
}