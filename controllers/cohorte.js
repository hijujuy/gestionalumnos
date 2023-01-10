const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}
const campos_cohorte = {
  id: true,
  nombre: true,
  estado: true,
  resoluciones: {
    select: {
      id: true,
      tipo: true,
      numero: true,
      ejercicio: true
    }
  }
}

const save = async(req, res) => {
  const {
    nombre,
    id_resolucion
  } = req.body

  try {
    const result = await prisma.cohorte.create({
        select: campos_cohorte,
        data: {
            nombre,
            id_usuario_creador:     usuario.id,
            id_usuario_modificador: usuario.id,
            resoluciones: {
              connect: {
                id: id_resolucion,
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
    id_resolucion
  } = req.body

  try {        
    const result = await prisma.cohorte.update({
        where: { 
            id: Number(req.params.id)
        },
        select: campos_cohorte,
        data: {
            nombre,
            id_resolucion,
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
        const result = await prisma.cohorte.update({
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
        const result = await prisma.cohorte.update({
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
        const result = await prisma.cohorte.findMany({
          select: campos_cohorte
        })
        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.cohorte.findUnique({
            where: {
                id: id
            },
            select: campos_cohorte,
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