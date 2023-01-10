const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    // Toda la info del token
    /*const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        console.log(payload);*/

    // Extraigo el uid del token
    const { uid, exp } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    if (exp <= moment().unix()) {
      return res.status(404).json({
        ok: false,
        msg: "El Token ha espirado",
      });
    }

    const usuario =
      await prisma.$queryRaw`SELECT * FROM public."usuarios" WHERE id = ${uid}`;

    if (!usuario.length > 0) {
      return res.status(401).json({
        ok: false,
        msg: "Token no válido - usuario no existe DB",
      });
    }
    // Verificar si el uid tiene estado true
    if (usuario[0].estado === false) {
      return res.status(401).json({
        ok: false,
        msg: "Token no válido - usuario con estado: false",
      });
    }
    // Otorga acceso a la info desde el controlador y/o middlewares
    req.usuario = usuario;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
