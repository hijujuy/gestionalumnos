const usuario = require("../routes/usuario");
const auth = require("../routes/auth");
const response = require("../network/response");

const cargo = require("../routes/cargo");
const carrera = require("../routes/carrera");
const cohorte = require("../routes/cohorte");
const convenio = require("../routes/convenio");
const division = require("../routes/division");
const especialdad = require("../routes/especialidad");
const estado_civil = require("../routes/estado_civil");
const genero = require("../routes/genero");
const instituto = require("../routes/instituto");
const localidad = require("../routes/localidad");
const nacionalidad = require("../routes/nacionalidad");
const oferta_educativa = require("../routes/oferta_educativa");
const personal = require("../routes/personal");
const persona = require("../routes/persona");
const puesto = require("../routes/puesto");
const regimen_cursada = require("../routes/regimen_cursada");
const region = require("../routes/region");
const resolucion = require("../routes/resolucion");
const rol = require("../routes/rol");
const carrera_unidad = require("../routes/carrera_unidad");
const tipo_documento = require("../routes/tipo_documento");
const titulo = require("../routes/titulo");
const unidad_curricular = require("../routes/unidad_curricular");
const permiso = require("../routes/permiso");
const acceso = require("../routes/acceso");
const accion = require("../routes/accion");
const modulo = require("../routes/modulo");
const alumno = require("../routes/alumno");
const departamento = require("../routes/departamento");
const provincia = require("../routes/provincia");
const correo = require("../routes/correo");

const routes = function (server) {
  server.use("/api/carrera", carrera);

  server.use("/api/cohorte", cohorte);

  server.use("/api/usuario", usuario);

  server.use("/api/auth", auth);

  server.use("/api/alumno", alumno);

  server.use("/api/convenio", convenio);

  server.use("/api/division", division);

  server.use("/api/especialidad", especialdad);

  server.use("/api/estado_civil", estado_civil);

  server.use("/api/genero", genero);

  server.use("/api/instituto", instituto);

  server.use("/api/localidad", localidad);

  server.use("/api/nacionalidad", nacionalidad);

  server.use("/api/oferta_educativa", oferta_educativa);

  server.use("/api/personal", personal);

  server.use("/api/persona", persona);

  server.use("/api/puesto", puesto);

  server.use("/api/regimen_cursada", regimen_cursada);

  server.use("/api/region", region);

  server.use("/api/resolucion", resolucion);

  server.use("/api/rol", rol);

  server.use("/api/carrera_unidad", carrera_unidad);

  server.use("/api/titulo", titulo);

  server.use("/api/unidad_curricular", unidad_curricular);

  server.use("/api/tipo_documento", tipo_documento);

  server.use("/api/unidad_curricular", unidad_curricular);

  server.use("/api/tipo_documento", tipo_documento);

  server.use("/api/permiso", permiso);

  server.use("/api/acceso", acceso);

  server.use("/api/accion", accion);

  server.use("/api/departamento", departamento);

  server.use("/api/provincia", provincia);

  server.use("/api/modulo", modulo);

  server.use("/api/correo", correo);

  server.use((req, res, next) => {
    response.success(req, res, "Ruta inexistente.", 404);
  });

  server.use((error, req, res, next) => {
    response.error(req, res, "Intente nevamente", error);
  });
};

module.exports = routes;
