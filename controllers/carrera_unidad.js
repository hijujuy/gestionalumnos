const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const save = async(req, res) => {
  const {
    id_carrera,
    id_unidad,
    anio
  } = req.body
    try {
        const result = await prisma.carreras_unidades.create({
            data: {
                anio,
                carreras: {
                    connect: {
                        id_carrera: id_carrera
                    }
                },
                unidades_curriculares: {
                    connect: {
                        id: id_unidad
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
    id_carrera,
    id_unidad,
    anio
  } = req.body
  try {        
    const result = await prisma.carreras_unidades.update({
      where: { 
        id: Number(req.params.id) 
      },
      data: {
        id_carrera,
        id_unidad,
        anio,
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
        const result = await prisma.carreras_unidades.findMany();
        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.carreras_unidades.findUnique({
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