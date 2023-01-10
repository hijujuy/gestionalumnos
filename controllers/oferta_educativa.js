const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const campos = {
  carreras: {
    select: {
      nombre: true,
      duracion: true
    }
  },
  institutos: {
    select: {
      nombre:     true,
      cue:        true,
      telefono:   true,
      url:        true,
      direccion:  true,
      correo:     true
    }
  }
}

const save = async(req, res) => {
  const {
    id_instituto,
    id_carrera
  } = req.body

  try {
    const result = await prisma.ofertas_educativas.create({
      data: {        
        carreras: {
          connect: {
            id_carrera: id_carrera
          }
        },
        institutos: {
          connect: {
            id: id_instituto
          }
        },
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
    id_instituto,
    id_carrera
  } = req.body

  try {        
    const result = await prisma.ofertas_educativas.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            id_carrera,
            id_instituto,
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
        const result = await prisma.ofertas_educativas.findMany({
          select: campos
        })
        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    try {
        const result = await prisma.ofertas_educativas.findUnique({
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

module.exports = {
    save,
    actualize,
    getAll,
    getById,
}