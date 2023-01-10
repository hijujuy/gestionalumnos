const { response, request } = require("express");

const { PrismaClient } = require("@prisma/client");
const { generarJWTcorreo } = require("../helpers/generar-jwt-correo");
const { transporter } = require("../correo/mailer");
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

const enviar = async (req, res = response) => {
  const { correo, id_usuario } = req.body;

  const token = await generarJWTcorreo(id_usuario);
  const link = `http://localhost:3000/validar/${token}`;
  try {
    await transporter.sendMail({
      from: '"Verificación de cuenta 👻" <dominiolibre@gmail.com>', // sender address
      to: correo, // list of receivers
      subject: "Verificación de Cuenta ✔", // Subject line
      html: `
      <b>Haga click en el siguiente enlace para verificar su registro.</b><br>
      <a href="${link}">${link}</a>
      `, // html body
    });

    res.json({
      ok: true,
      msg: "Correo Enviado",
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  enviar,
};
