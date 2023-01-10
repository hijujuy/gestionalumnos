const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const nombreExists = async (nombre = '') => {
  // Verificar si el estado_civil existe
  
  const estado_civil = await prisma.estados_civiles.findFirst({
    where: {
      nombre: nombre,
    },
  })
      
  if (!estado_civil){
    return true
  }
  else if (nombre == estado_civil.nombre){
    throw new Error(`El estado civil ${nombre} ya fué registrado`)
  }
}

const idExists = async (id) => {
  // Verificar si el id de estado_civil existe
  
  const estado_civil = await prisma.estados_civiles.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!estado_civil){
    throw new Error(`El estado civil es inexiste.`)
  }
  else if (id == estado_civil.id){
    return true
  }

}

const maybeDesable = async (id) => {
  // Verificar si el id de estado_civil existe
  
  const estado_civil = await prisma.estados_civiles.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!estado_civil.estado){
    throw new Error(`El estado_civil ya se encuentra deshabilitado.`)
  }
  else {
    return estado_civil.estado
  }
}

const maybeEnable = async (id) => {
  // Verificar si el id de estado_civil existe
  
  const estado_civil = await prisma.estados_civiles.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (estado_civil.estado){
    throw new Error(`El estado_civil ya se encuentra habilitado.`)
  }
  else {
    return !estado_civil.estado
  }
}

module.exports = {
    nombreExists,
    idExists,
    maybeDesable,
    maybeEnable
}
