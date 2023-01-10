const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const nombreExists = async (nombre = '') => {
  // Verificar si el genero existe
  
  const genero = await prisma.generos.findFirst({
    where: {
      nombre: nombre,
    },
  })
      
  if (!genero){
    return true    
  }
  else if (nombre == genero.nombre){
    throw new Error(`Genero con nombre: ${nombre} ya fué registrado`)
  }
}

const idExists = async (id) => {
  // Verificar si el id de genero existe
  
  const genero = await prisma.generos.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!genero){
    throw new Error(`Genero con id: ${id} es inexiste.`)
  }
  else if (id == genero.id){
    return true
  }

}

const maybeDesable = async (id) => {
  // Verificar si el id de genero existe
  
  const genero = await prisma.generos.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!genero.estado){
    throw new Error(`El genero ya se encuentra deshabilitado.`)
  }
  else {
    return genero.estado
  }
}

const maybeEnable = async (id) => {
  // Verificar si el id de genero existe
  
  const genero = await prisma.generos.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (genero.estado){
    throw new Error(`El genero ya se encuentra habilitado.`)
  }
  else {
    return !genero.estado
  }
}

module.exports = {
    nombreExists,
    idExists,
    maybeDesable,
    maybeEnable
}
