const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}
const campos_carrera = {
  nombre: true,
  duracion: true,
  horas_catedras: true,
  horas_reloj: true,
  cohorte: {
    select: {
      nombre: true,
    }
  }
}

const save = async(req, res) => {
  const {
    nombre,
    duracion,
    horas_catedras,
    horas_reloj,
    id_cohorte
  } = req.body

  try {
    const result = await prisma.carreras.create({
        select: campos_carrera,
        data: {
            nombre,
            duracion,
            horas_catedras,
            horas_reloj,
            id_usuario_creador:     usuario.id,
            id_usuario_modificador: usuario.id,
            cohorte: {
              connect: {
                id: id_cohorte,
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
    duracion,
    horas_catedras,
    horas_reloj,
    id_cohorte
  } = req.body

  try {        
    const result = await prisma.carreras.update({
        where: { 
            id_carrera: Number(req.params.id)
        },
        select: campos_carrera,
        data: {
            nombre,
            duracion,
            horas_catedras,
            horas_reloj,
            id_cohorte,
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
        const result = await prisma.carreras.update({
            where: {
                id_carrera: Number(req.params.id)
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
        const result = await prisma.carreras.update({
            where: {
                id_carrera: Number(req.params.id)
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
        const list = await prisma.carreras.findMany();
        
        response.success(req, res, list, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const cargo = await prisma.carreras.findUnique({
            where: {
                id_carrera: id
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
    desable,
    enable,
    getAll,
    getById,
}