const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const nombreExists = async (nombre = '') => {
  // Verificar si el nacionalidad existe
  
  const nacionalidad = await prisma.nacionalidades.findFirst({
    where: {
      nombre: nombre,
    },
  })
      
  if (!nacionalidad){
    return true
  }
  else if (nombre == nacionalidad.nombre){
    throw new Error(`La nacionalidad ${nombre} ya fué registrada`)
  }
}

const idExists = async (id) => {
  // Verificar si el id de nacionalidad existe
  
  const nacionalidad = await prisma.nacionalidades.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!nacionalidad){
    throw new Error(`La nacionalidad es inexiste.`)
  }
  else if (id == nacionalidad.id){
    return true
  }

}

const maybeDesable = async (id) => {
  // Verificar si el id de nacionalidad existe
  
  const nacionalidad = await prisma.nacionalidades.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!nacionalidad.estado){
    throw new Error(`Esta nacionalidad ya se encuentra deshabilitada.`)
  }
  else {
    return nacionalidad.estado
  }
}

const maybeEnable = async (id) => {
  // Verificar si el id de nacionalidad existe
  
  const nacionalidad = await prisma.nacionalidades.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (nacionalidad.estado){
    throw new Error(`Esta nacionalidad ya se encuentra habilitada.`)
  }
  else {
    return !nacionalidad.estado
  }
}

module.exports = {
    nombreExists,
    idExists,
    maybeDesable,
    maybeEnable
}
