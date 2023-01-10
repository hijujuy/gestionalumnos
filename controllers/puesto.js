const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const usuario = {id : 1}

const campos_puesto = {
  hora_semanal: true,
  divisiones: {
    select: {
        id: true,
      tipo_division: true,
    }
  }
}

const save = async(req, res) => {
  const {
    hora_semanal,
    id_division
  } = req.body

  try {
    const result = await prisma.puestos.create({
      data: {
        hora_semanal:     hora_semanal,        
        id_usuario_creador:     usuario.id,
        id_usuario_modificador: usuario.id,
        divisiones: {
          connect: {
            id: id_division
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
      hora_semanal,
      id_division
    } = req.body

    try {        
        const result = await prisma.puestos.update({
            where: { 
                id: Number(req.params.id) 
            },
            data: {
                hora_semanal,
                id_usuario_modificador: usuario.id,
                id_division,
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
        const result = await prisma.puestos.update({
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
        const result = await prisma.puestos.update({
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
    const result = await prisma.puestos.findMany(
      /* {
        select: campos_puesto
      } */
    );
    
    response.success(req, res, result, 200)
  }
  catch (e) {
      response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
  }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const result = await prisma.puestos.findUnique({
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