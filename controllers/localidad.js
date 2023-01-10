const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const save = async(req, res) => {
  const {
    nombre,
  } = req.body

  try {
    const result = await prisma.localidades.create({
      data: {
        nombre,
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

  const {
    nombre
  } = req.body

  try {        
    const result = await prisma.localidades.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            nombre,
            id_usuario_modificador: usuario.id,
        },
    })
    response.success(req, res, result, 200)
  }
  catch (error) {
    response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }

}

const desable = async(req, res) => {
    
    try {
        const result = await prisma.localidades.update({
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
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }   
}

const enable = async(req, res) => {
    
    try {
        const result = await prisma.localidades.update({
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
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }   

}

const getAll = async (req, res) => {

    try {
        const result = await prisma.localidades.findMany()
        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    try {
        const result = await prisma.localidades.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }

}

const getByIdDepartamento = async (req, res) => {

    try {
        const result = await prisma.localidades.findMany({
            where: {
                id_departamento: Number(req.params.id)
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
    desable,
    enable,
    getAll,
    getById,
    getByIdDepartamento,
}