const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const save = async(req, res) => {
  const {
    id_rol,
    id_accion,
    id_modulo
  } = req.body
  try {
    const result = await prisma.accesos.create({
      data: {                
        acciones: {
          connect: {
            id: id_accion
          }
        },
        modulo: {
          connect: {
            id: id_modulo
          }
        },
        roles: {
          connect: {
            id: id_rol
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

const actualize = async (req, res) => {
  const {    
    id_rol,
    id_accion,
    id_modulo
  } = req.body
  try {        
    const result = await prisma.accesos.update({
      where: { 
        id: Number(req.params.id)
      },
      data: {
        id_rol,
        id_accion,
        id_modulo
      }
    })
    response.success(req, res, result, 200)
  }
  catch (error) {
    response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }

}

const getAll = async (req, res) => {

    try {        
      const result = await prisma.accesos.findMany();
        
      response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.accesos.findUnique({
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