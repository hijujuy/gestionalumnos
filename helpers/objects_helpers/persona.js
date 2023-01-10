const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const dniExists = async (numero) => {
  // Verificar si el numero de documento existe en la BD
  
  const result = await prisma.personas.findFirst({
    where: {
      dni: numero
    }
  })
      
  if (!result){
    return Promise.reject('El numero de documento no fué registrado.')    
  }
  else if (result.dni == numero) {
    return true
  }
}

const dniDontExists = async (numero) => {
  // Verificar si el numero de documento existe en la BD
  
  const result = await prisma.personas.findFirst({
    where: {
      dni: numero
    }
  })
      
  if (!result){
    return true
  }
  else {
    return Promise.reject('El numero de documento ya fué registrado.')
  }
}

const cuilExists = async (numero) => {
  // Verificar si el numero de cuil existe en la BD
  
  const result = await prisma.personas.findFirst({
    where: {
      cuil: numero,
    },
  })
      
  if (!result){
    return Promise.reject(`El numero de cuil ${numero} no fué registrado.`)    
  }
  else if (result.cuil == numero){
    return true  
  }
}

const cuilDontExists = async (numero) => {
  // Verificar si el numero de cuil existe en la BD
  
  const result = await prisma.personas.findFirst({
    where: {
      cuil: numero,
    },
  })
      
  if (!result){
    return true
  }
  else if (result.cuil == numero){
    return Promise.reject(`El numero de cuil ${numero} ya fué registrado.`)
  }
}

const emailExists = async (email = '') => {
  //Verifica si el email existe en la BD
  const result = await prisma.personas.findFirst({
    where: {
      correo: email,
    },
  })

  if (!result) {
    return Promise.reject(`El email ${email} no se encuentra registrado.`)
  }
  else if (result.correo == email) {
    return true
  }
}

const emailDontExists = async (email = '') => {
  //Verifica si el email existe en la BD
  const result = await prisma.personas.findFirst({
    where: {
      correo: email,
    },
  })

  if (!result) {
    return true
  }
  else if (result.correo == email) {
    return Promise.reject(`El email ${email} ya se encuentra registrado.`)
  }
}

const idExists = async (id) => {
  // Verificar si el id de una persona existe en la BD
  
  const result = await prisma.personas.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!result){
    throw new Error(`El identificador de persona es inexiste.`)
  }
  else if (id == result.id){
    return true
  }

}

const maybeDesable = async (id) => {
  // Verificar si la persona esta deshabilitada
  
  const result = await prisma.personas.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (!result.estado){
    throw new Error(`Esta persona ya se encuentra deshabilitada.`)
  }
  else {
    return result.estado
  }
}

const maybeEnable = async (id) => {
  // Verificar si una persona esta habilitada
  
  const result = await prisma.personas.findUnique({
    where: {
      id: Number(id),
    },
  })
      
  if (result.estado){
    throw new Error(`Esta persona ya se encuentra habilitada.`)
  }
  else {
    return !result.estado
  }
}

module.exports = {
    dniExists,
    dniDontExists,
    cuilExists,
    cuilDontExists,
    emailExists,
    emailDontExists,
    idExists,
    maybeDesable,
    maybeEnable
}
