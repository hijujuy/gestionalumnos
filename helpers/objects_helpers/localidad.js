const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const nombreExists = async (nombre = '') => {
  // Verificar si el nombre de localidad existe
  
  const result = await prisma.localidades.findFirst({
    where: {
      nombre: nombre,
    },
  })
      
  if (!result){
    return true
  }
  else if (nombre == result.nombre){
    throw new Error(`La localidad "${nombre}" ya fué registrada.`)
  }
}

const idExists = async (id) => {
  // Verificar si el id de localidad existe
  
  const result = await prisma.localidades.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!result){
    throw new Error(`La localidad es inexiste.`)
  }
  else if (id == result.id){
    return true
  }

}

const maybeDesable = async (id) => {
  // Verificar si la localidad esta deshabilitada
  
  const result = await prisma.localidades.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!result.estado){
    throw new Error(`Esta localidad ya se encuentra deshabilitada.`)
  }
  else {
    return result.estado
  }
}

const maybeEnable = async (id) => {
  // Verificar si la localidad esta habilitada
  
  const result = await prisma.localidades.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (result.estado){
    throw new Error(`Esta localidad ya se encuentra habilitada.`)
  }
  else {
    return !result.estado
  }
}

module.exports = {
    nombreExists,
    idExists,
    maybeDesable,
    maybeEnable
}
