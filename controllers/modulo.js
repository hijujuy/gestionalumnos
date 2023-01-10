const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const save = async(req, res) => {
  const {
    nombre,
    descripcion
  } = req.body

  try {
    const result = await prisma.modulos.create({
      data: {
        nombre,
        descripcion
      }
    })
    response.success(req, res, result, 201)
  }
  catch (error) {
    response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }

}

const actualize = async (req, res) => {

  const {
    nombre,descripcion
  } = req.body

  try {        
    const result = await prisma.modulos.update({
        where: { 
            id_carrera: Number(req.params.id)
        },
        select: campos_carrera,
        data: {
          nombre,
          descripcion
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
        const list = await prisma.modulos.findMany();
        
        response.success(req, res, list, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const cargo = await prisma.modulos.findUnique({
            where: {
                id: id
            },
        });
        response.success(req, res, cargo, 200)
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