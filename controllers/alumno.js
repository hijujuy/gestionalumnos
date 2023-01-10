const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../network/response");

const usuario = { id: 1 };
const campos = {
  libreta: true,
};

const save = async (req, res) => {
  const { libreta, persona } = req.body;
  try {
    const result = await prisma.cargos.create({
      data: {
        tipo_cargo: req.body.tipo_cargo,
        id_usuario_creador: usuario.id,
        id_usuario_modificador: usuario.id,
      },
    });
    response.success(req, res, result, 201);
  } catch (error) {
    response.error(
      req,
      res,
      "Intente nuevamente en cinco minutos.",
      500,
      error
    );
  }
};

const actualize = async (req, res) => {
  try {
    const result = await prisma.cargos.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        nombre: req.body.tipo_cargo,
        id_usuario_modificador: usuario.id,
      },
    });
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(
      req,
      res,
      "Intente nuevamente en cinco minutos.",
      500,
      error
    );
  }
};

const desable = async (req, res) => {
  try {
    const result = await prisma.cargos.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        estado: false,
        id_usuario_modificador: usuario.id,
      },
    });
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(
      req,
      res,
      "Intente nuevamente en cinco minutos.",
      500,
      error
    );
  }
};

const enable = async (req, res) => {
  try {
    const result = await prisma.cargos.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        estado: true,
        id_usuario_modificador: usuario.id,
      },
    });
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(
      req,
      res,
      "Intente nuevamente en cinco minutos.",
      500,
      error
    );
  }
};

const getAll = async (req, res = response) => {
  /*const estado = req.query.estado.toLocaleLowerCase();
  let active = "";
  if (estado === "true") {
    active = true;
  } else {
    active = false;
  }*/

  try {
    const usuarios =
      //await prisma.$queryRaw`SELECT * FROM public."alumnos" WHERE estado = ${active}`;
      //await prisma.$queryRaw`SELECT public.personas.*, public.alumnos.* FROM public."alumnos" INNER JOIN public.personas ON public.alumnos.id_persona = public.personas.id`;
      await prisma.$queryRaw`SELECT public.alumnos.* FROM public."alumnos" INNER JOIN public.personas ON public.alumnos.id_persona = public.personas.id`;

    if (!usuarios.length) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron usuarios",
      });
    }

    res.status(200).json({
      ok: true,
      usuarios,
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

const getById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const cargo = await prisma.cargos.findUnique({
      where: {
        id: id,
      },
    });
    response.success(req, res, cargo, 200);
  } catch (e) {
    response.error(req, res, "Intente nuevamente en cinco minutos.", 500, e);
  }
};

module.exports = {
  save,
  actualize,
  desable,
  enable,
  getAll,
  getById,
};
