/**
 * Middlewares de validacion de parametros pasados por ruta y cuerpo
 * en solicitudes de metodos http para el modelo persona.
 */
const { body, param, validationResult } = require("express-validator");
const {
  dniExists,
  emailExists,
  usuarioExists,
  validarClave,
} = require("../../helpers/objects_helpers/usuario");

const save = [
  body("dni")
    .trim()
    .escape()
    .exists({ checkFalsy: true })
    .withMessage("El campo documento es requerido.")
    .bail()
    .isNumeric()
    .withMessage("El campo documento solo debe contener números.")
    .bail()
    .isLength({ min: 7, max: 8 })
    .withMessage("El campo documento debe contener de 7 a 8 dígitos.")
    .bail()
    .custom(dniExists),
  body("apellido")
    .trim()
    .escape()
    .exists({ checkFalsy: true })
    .withMessage("El campo apellido es requerido.")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El campo apellido solo debe contener letras.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El campo apellido debe contener de 2 a 50 caracteres.")
    .bail(),
  body("nombre")
    .trim()
    .escape()
    .exists({ checkFalsy: true })
    .withMessage("El campo nombre es requerido.")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El campo nombre solo debe contener letras.")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El campo apellido debe contener de 2 a 100 caracteres.")
    .bail(),
  body("correo")
    .normalizeEmail()
    .exists({ checkFalsy: true })
    .withMessage("El campo correo electrónico es requerido.")
    .bail()
    .isEmail()
    .withMessage("El campo correo electrónico es inválido.")
    .bail()
    .custom(emailExists),
  body("usuario")
    .trim()
    .escape()
    .exists({ checkFalsy: true })
    .withMessage("El campo nombre de usuario es requerido.")
    .bail()
    .matches("^[0-9a-zA-Z]*$")
    .withMessage(
      "El campo nombre de usuario solo debe contener letras y/o números."
    )
    .bail()
    .isLength({ min: 10, max: 20 })
    .withMessage(
      "El campo nombre de usuario debe contener de 10 a 20 caracteres."
    )
    .bail()
    .custom(usuarioExists),
  body("clave")
    .trim()
    .escape()
    .exists({ checkFalsy: true })
    .withMessage("El campo clave es requerido.")
    .bail()
    .isLength({ min: 8, max: 20 })
    .withMessage("El campo clave debe contener de 8 a 20 caracteres.")
    .bail()
    .custom(validarClave),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      next(errors);
    }
    next();
  },
];

module.exports = {
  save,
};
