const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passwordValidator = require("password-validator");

const dniExists = async (numero) => {
  // Verificar si el numero de documento existe en la BD
  const result = await prisma.personas.findFirst({
    where: {
      dni: numero,
    },
  });

  if (result) {
    //return Promise.reject("El numero de documento ya está registrado.");
    throw new Error(`El número de documento ya está registrado.`);
  }
};

const emailExists = async (email = "") => {
  //Verifica si el email existe en la BD
  const result = await prisma.personas.findFirst({
    where: {
      correo: email,
    },
  });

  if (result) {
    throw new Error(`El correo electrónico ya está registrado.`);
  }
};

const usuarioExists = async (usuario) => {
  // Verificar si el usuario existe en la BD
  const result = await prisma.usuarios.findFirst({
    where: {
      usuario,
    },
  });

  if (result) {
    //return Promise.reject("El numero de documento ya está registrado.");
    throw new Error(`El usuario ya está registrado.`);
  }
};

const validarClave = async (clave) => {
  const schema = new passwordValidator();

  schema
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

  // Validate against a password string
  //console.log(schema.validate(clave));
  console.log(schema.validate(clave, { list: true }));
  //console.log(schema.validate(clave, { details: true }));

  if (!schema.validate(clave)) {
    //throw new Error(`${schema.validate(clave, { details: true })}`);
    throw new Error(`${schema.validate(clave, { list: true })}`);
  }
  /*if (schema.not().uppercase) {
    throw new Error(`Ingrese mayyuscula`);
  }*/
};

module.exports = {
  dniExists,
  emailExists,
  usuarioExists,
  validarClave,
};
