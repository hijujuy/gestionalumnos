const { PrismaClient } = require("@prisma/client");
const { rejects } = require("assert");
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

//Si viene el rol vacio x defecto USER_ROLE
const esRoleValido = async (rol = "USER_ROLE") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    //throw new Error(`El rol ${ rol } no está registrado en la BD`);
    return reject(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  // Verificar si el correo existe
  // El campo correo deber ser unico
  // Llevar todo a minuscula con toLowerCase()
  const correo2 = correo.toLowerCase();
  const existeEmail =
    await prisma.$queryRaw`SELECT * FROM public."usuarios" WHERE correo = ${correo2}`;
  if (!existeEmail.length > 0) {
    throw new Error(`El correo: ${correo}, no es correcto`);
  }
};

const usuarioExiste = async (usuario = "") => {
  // Verificar si el usuario existe
  // El campo usuario deber ser unico
  // Llevar todo a minuscula con toLowerCase()
  const usuario2 = usuario.toLowerCase();
  const existeUsuario =
    await prisma.$queryRaw`SELECT * FROM public."usuarios" WHERE usuario = ${usuario2}`;
  if (!existeUsuario.length > 0) {
    throw new Error(`El usuario: ${usuario}, no es correcto`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el usuario existe
  const existeUsuario =
    await await prisma.$queryRaw`SELECT * FROM public."usuarios" WHERE id = ${id}`;
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Categorias
 */
const existeCategoriaPorId = async (id) => {
  // Verificar si el correo existe
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Productos
 */
const existeProductoPorId = async (id) => {
  // Verificar si el correo existe
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas,
  usuarioExiste,
};
