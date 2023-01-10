const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});
prisma.$on("query", (e) => {
  console.log(e);
});

const save = async (req, res = response) => {
  
  const { nombre, apellido, dni, correo, usuario, clave } = req.body;
  
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  const pass = bcryptjs.hashSync(clave, salt);

  try {
    const result = await prisma.personas.create({
      data: {
        nombre,
        apellido,
        correo,
        id_usuario_creador: 999999,
        dni,
        usuarios: {
          create: {
            usuario,
            correo,
            clave: pass,            
            estado: true,
          },
        },
      },
      include: {
        usuarios: true,
      },
    });

    res.json({
      ok: true,
      id_persona: result.id,
      correo_persona: result.correo,
      id_usuario: result.usuarios[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  save,
};
