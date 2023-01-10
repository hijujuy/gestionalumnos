const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../network/response')

const campos_personal = {
  fecha_designacion: true,                 
  nro_legajo: true,
  fecha_ceses: true,
  causa_cese: true,  
  cargos: {
    select: {
      tipo_cargo: true,
    }
  },
  convenios: {
    select: {
      tipo_convenio: true,
    }
  },
  especialidades: {
    select: {
      tipo_especialidad: true,
    }
  },
  institutos: {
    select: {
      cue: true,
      nombre: true,      
    }
  },
  puestos: {
    select: {
      hora_semanal: true,
    }
  },
  titulos: {
    select: {
      tipo_titulo: true,
    }
  }  
}

const save = async(req, res) => {
    req.usuario = { id: 1 }

    const {
      fecha_designacion,                 
      nro_legajo,
      fecha_ceses,
      causa_cese,  
      id_cargo,
      id_convenio,
      id_especialidad,
      id_titulo,
      id_puesto,
      id_instituto
    } = req.body

    try {
        const result = await prisma.personal.create({
          select: campos_personal,
          data: {
            fecha_designacion: new Date(fecha_designacion),
            nro_legajo,
            fecha_ceses: new Date(fecha_ceses),
            causa_cese,
            id_usuario_creador:     req.usuario.id,
            id_usuario_modificador: req.usuario.id,
            cargos: { 
              connect: { 
                id: id_cargo
              }
            },
            convenios: { 
              connect: { 
                id: id_convenio
              }
            },
            especialidades: {
              connect: {
                id: id_especialidad
              }
            },
            institutos: { 
              connect: {
                id: id_instituto
              }
            },
            titulos: {
              connect: {
                id: id_titulo
              }
            },
            puestos: {
              connect: {
                id: id_puesto
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

const actualize = async(req, res) => {
    req.usuario = { id: 1 }
    
    const {
      fecha_designacion,                 
      nro_legajo,
      fecha_ceses,
      causa_cese,
      id_cargo,
      id_convenio,
      id_especialidad,
      id_titulo,
      id_puesto,
      id_instituto
    } = req.body

    try {
        const result = await prisma.personal.update({
          where: {
              id: Number(req.params.id)
          },
          select: campos_personal,
          data: {
            fecha_designacion: new Date(fecha_designacion),
            nro_legajo,
            fecha_ceses: new Date(fecha_ceses),
            causa_cese,
            id_cargo,
            id_convenio,
            id_especialidad,
            id_titulo,
            id_puesto,
            id_instituto,
            id_usuario_modificador: req.usuario.id,
          },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }

}

const desable = async(req, res) => {
    req.usuario = { id: 3 }

    try {
        const result = await prisma.personal.update({
            where: {
              id: Number(req.params.id)
            },
            select: {
              id: true,
              estado: true,
            },
            data: {
              estado:                 false,
              id_usuario_modificador: req.usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
    }
}

const enable = async(req, res) => {
  req.usuario = { id: 2 }

  try {
      const result = await prisma.personal.update({
          where: {
            id: Number(req.params.id)
          },
          select: {
            id: true,
            estado: true,
          },
          data: {
            estado:                 true,
            id_usuario_modificador: req.usuario.id,
          },
      })
      response.success(req, res, result, 200)
  }
  catch (error) {
      response.error(req, res, "Intente nuevamente en cinco minutos.", 500, error)
  }
}

const getAll = async(req, res) => {
    
    try {        
        const result = await prisma.personal.findMany(
          /* {
            select: campos_personal,
          } */
        )        
        response.success(req, res, result, 200)
    }
    catch (e) {
        response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e)
    }  
}

const getById = async(req, res) => {
    
  const id = Number(req.params.id)
  try {
    const result = await prisma.personal.findUnique({
      where: {
          id: id
      },              
      //select: campos_personal
    })      
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
};