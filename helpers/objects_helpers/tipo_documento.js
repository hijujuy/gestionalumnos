const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const nombreExists = async (nombre = '') => {
  // Verificar si el tipo_documento existe
  
  const result = await prisma.tipos_documentos.findFirst({
    where: {
      nombre: nombre,
    },
  })
      
  if (!result){
    return true
  }
  else if (nombre == result.nombre){
    throw new Error(`El tipo de documento "${nombre}" ya fué registrado.`)
  }
}

const idExists = async (id) => {
  // Verificar si el id de tipo_documento existe
  
  const result = await prisma.tipos_documentos.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!result){
    throw new Error(`El tipo de documento es inexiste.`)
  }
  else if (id == result.id){
    return true
  }

}

const maybeDesable = async (id) => {
  // Verificar si el id de tipo_documento existe
  
  const result = await prisma.tipos_documentos.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!result.estado){
    throw new Error(`Este tipo de documento ya se encuentra deshabilitada.`)
  }
  else {
    return result.estado
  }
}

const maybeEnable = async (id) => {
  // Verificar si el id de nacionalidad existe
  
  const result = await prisma.tipos_documentos.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (result.estado){
    throw new Error(`Este tipo de documento ya se encuentra habilitada.`)
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
