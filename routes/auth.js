const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");

const { usuarioExiste } = require("../helpers/db-validators");

const {
  login,
  googleSignin,
  validarTokenUsuario,
  getPermisos,
  validar,
} = require("../controllers/auth");
const { validarJWTcorreo } = require("../middlewares/validar-jwt-correo");

const router = Router();

router.post(
  "/login",
  [
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("usuario").custom(usuarioExiste),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSignin
);

router.get("/validartoken", [validarJWT], validarTokenUsuario);

router.get("/obtener-permisos", [validarJWT], getPermisos);

router.get("/validar/:token", [validarJWTcorreo], validar);

module.exports = router;
