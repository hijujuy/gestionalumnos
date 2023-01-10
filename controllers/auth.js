const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const login = async (req, res = response) => {
  const { usuario, clave } = req.body;
  //Para probar
  /*res.json({
        msg: 'Login ok',
        correo,
        clave
    })*/

  try {
    const usuario2 = usuario.toLowerCase();
    const result =
      await prisma.$queryRaw`SELECT * FROM public."usuarios" WHERE usuario = ${usuario2}`;

    // Verificar si el usuario está activo
    if (result[0].estado === false) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(clave, result[0].clave);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(result[0].id);

    res.json({
      ok: true,
      usuario: result,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  } finally {
    await prisma.$disconnect();
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

const validarTokenUsuario = async (req, res = response) => {
  // Generar el JWT
  const token = await generarJWT(req.usuario[0].id);

  res.json({
    ok: true,
    usuario: req.usuario,
    token: token,
  });
};

const getPermisos = async (req, res = response) => {
  /*res.json({
    msg: "getPermisos",
  });*/

  try {
    const permisos =
      await prisma.$queryRaw`SELECT * FROM public."permisos" WHERE id_usuario = ${req.usuario[0].id}`;
    if (!permisos.length) {
      return res.status(404).json({
        ok: false,
        msg: "No se definieron permisos",
      });
    }
    res.status(200).json({
      ok: true,
      permisos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  } finally {
    await prisma.$disconnect();
  }
};

const validar = async (req, res = response) => {
  try {
    await prisma.usuarios.update({
      where: {
        id: Number(req.id_usuario),
      },
      data: {
        estado: true,
      },
    });
    res.status(500).json({
      ok: true,
      msg: "Validación exitosa",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
  googleSignin,
  validarTokenUsuario,
  getPermisos,
  validar,
};
