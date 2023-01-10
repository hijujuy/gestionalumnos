const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const campos = {
  id: true,
  nombre: true,
  horas_semanales: true,
  include: {
    regimen_cursada: {
      select: {
        id_regimen_cursada: true,
        nombre: true
      }
    }
  }
}

const save = async(req, res) => {
  const {
    nombre,
    horas_semanales,
    id_regimen_cursada
  } = req.body
    try {
        const result = await prisma.unidades_curriculares.create({
            data: {
                nombre,
                horas_semanales,
                id_usuario_creador:     usuario.id,
                id_usuario_modificador: usuario.id,
                id_regimen_cursada,
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
    horas_semanales,
    id_regimen_cursada
  } = req.body
  try {        
    const result = await prisma.unidades_curriculares.update({
      where: { 
        id: Number(req.params.id) 
      },
      data: {
        nombre,
        horas_semanales,
        id_regimen_cursada,
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
        const result = await prisma.unidades_curriculares.update({
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
        const result = await prisma.unidades_curriculares.update({
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
        const result = await prisma.unidades_curriculares.findMany()
        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.unidades_curriculares.findUnique({
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
    desable,
    enable,
    getAll,
    getById,
}