const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const save = async(req, res) => {
  const {
    nombre,
    id_provincia
  } = req.body

  try {
    const result = await prisma.departamentos.create({
      data: {
        nombre: nombre,        
        id_usuario_creador:     usuario.id,
        id_usuario_modificador: usuario.id,
        provincias: {
          connect: {
            id: id_provincia
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
      nombre,
      id_provincia
    } = req.body

    try {        
        const result = await prisma.departamentos.update({
            where: { 
                id: Number(req.params.id) 
            },
            data: {
                nombre,
                id_usuario_modificador: usuario.id,
                id_provincia,
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
    const result = await prisma.departamentos.findMany()
    
    response.success(req, res, result, 200)
  }
  catch (e) {
      response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
  }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.departamentos.findUnique({
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

const getByIdProvincia = async (req, res) => {

  try {
      const result = await prisma.departamentos.findMany({
          where: {
              id_provincia: Number(req.params.id)
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
    getByIdProvincia
}