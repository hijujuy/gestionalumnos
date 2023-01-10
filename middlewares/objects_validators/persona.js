/**
 * Middlewares de validacion de parametros pasados por ruta y cuerpo
 * en solicitudes de metodos http para el modelo persona.
 */
const { body, param, validationResult } = require('express-validator')
const { 
  dniExists,
  dniDontExists, 
  cuilExists,
  cuilDontExists, 
  emailExists,
  emailDontExists,
  idExists, 
  maybeDesable, 
  maybeEnable } = require('../../helpers/objects_helpers/persona')
const { idExists : estadoCivilExists } = require('../../helpers/objects_helpers/estado_civil')
const { idExists : tipoDocumentoExists } = require('../../helpers/objects_helpers/tipo_documento')
const { idExists : nacionalidadExists } = require('../../helpers/objects_helpers/nacionalidad')
const { idExists : generoExists } = require('../../helpers/objects_helpers/genero')
const { idExists : localidadExists} = require('../../helpers/objects_helpers/localidad')

const save = [
  body('nombre')
    .exists({checkFalsy: true})
      .withMessage('El campo nombre es requerido.')
      .bail()
    .isAlpha('es-ES', { ignore: ' ' })
      .withMessage('El campo nombre solo debe contener letras.')
      .bail(),
  body('apellido')
    .exists({checkFalsy: true})
      .withMessage('El campo apellido es requerido.')
      .bail()
    .isAlpha('es-ES', { ignore: ' ' })
      .withMessage('El campo apellido solo debe contener letras.')
      .bail(),
  body('dni')
    .exists({checkFalsy: true})
      .withMessage('El numero de documento es requerido.')
      .bail()
    .isNumeric()
      .withMessage('El campo documento solo debe contener numeros.')
      .bail()
    .isLength({ min:7, max:8 })
      .withMessage('Nro de documento debe contener de 7 a 8 digitos.')
      .bail()
    .custom(dniDontExists),
  body('fecha_nacimiento')
    .exists({checkFalsy: true})
      .withMessage('La fecha de nacimiento es requerida.')
      .bail()
    .isDate({ format: 'YYYY/MM/DD' })
      .withMessage('La fecha ingresada no es valida.')
      .bail(),
  body('cuil')
    .exists({checkFalsy: true})
      .withMessage('El numero de cuil es requerido.')
      .bail()
    .isNumeric()
      .withMessage('El campo cuil solo debe contener numeros.')
      .bail()
    .isLength({ min:11, max:11 })
      .withMessage('Nro de cuil debe contener 11 digitos.')
      .bail()
    .custom(cuilDontExists),
  body('telefono')
    .exists({ checkFalsy:true })
      .withMessage('El numero de telefono es requrido.')
      .bail()
    .isNumeric()
      .withMessage('El campo telefono solo debe contener numeros.')
      .bail()
    .isLength({ max:20 })
      .withMessage('Nro de telefono solo puede contener 20 digitos como maximo.')
      .bail(),
  body('correo')
    .exists({ checkFalsy: true })
      .withMessage('Correo electronico es campo requerido.')
      .bail()
    .isEmail()
      .withMessage('Correo electronico es invalido.')
      .bail()
    .custom(emailDontExists),
  body('calle')
    .exists({checkFalsy: true})
      .withMessage('El campo calle de domicilio es requerido.')
      .bail(),
  body('id_estado_civil')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de estado civil es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de estado civil debe ser numerico.')
      .bail()
    .custom(estadoCivilExists),
  body('id_tipo_doc')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de tipo documento es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de tipo documento debe ser numerico.')
      .bail()
    .custom(tipoDocumentoExists),  
  body('id_nacionalidad')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de nacionalidad es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de nacionalidad debe ser numerico.')
      .bail()
    .custom(nacionalidadExists),
  body('id_genero')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de genero es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de genero debe ser numerico.')
      .bail()
    .custom(generoExists),
  body('id_localidad')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de localidad es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de localidad debe ser numerico.')
      .bail()
    .custom(localidadExists),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      next(errors)
    }

    next()
  }
]

const actualize = [
  param('id')
    .exists({checkFalsy: true})
      .withMessage('El identificador de persona es campo requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de persona es numerico.')
      .bail()
    .custom(idExists),
  body('nombre')
    .exists({checkFalsy: true})
      .withMessage('El campo nombre es requerido.')
      .bail()
    .isAlpha('es-ES', { ignore: ' ' })
      .withMessage('El campo nombre solo debe contener letras.')
      .bail(),
  body('apellido')
    .exists({checkFalsy: true})
      .withMessage('El campo apellido es requerido.')
      .bail()
    .isAlpha('es-ES', { ignore: ' ' })
      .withMessage('El campo apellido solo debe contener letras.')
      .bail(),
  body('dni')
    .exists({checkFalsy: true})
      .withMessage('El numero de documento es requerido.')
      .bail()
    .isNumeric()
      .withMessage('El campo documento solo debe contener numeros.')
      .bail()
    .isLength({ min:7, max:8 })
      .withMessage('Nro de documento debe contener de 7 a 8 digitos.')
      .bail()
    .custom(dniExists),
  body('fecha_nacimiento')
    .exists({checkFalsy: true})
      .withMessage('La fecha de nacimiento es requerida.')
      .bail()
    .isDate({ format: 'YYYY/MM/DD' })
      .withMessage('La fecha ingresada no es valida.')
      .bail(),
  body('cuil')
    .exists({checkFalsy: true})
      .withMessage('El numero de cuil es requerido.')
      .bail()
    .isNumeric()
      .withMessage('El campo cuil solo debe contener numeros.')
      .bail()
    .isLength({ min:11, max:11 })
      .withMessage('Nro de cuil debe contener 11 digitos.')
      .bail()
    .custom(cuilExists),
  body('telefono')
    .exists({ checkFalsy:true })
      .withMessage('El numero de telefono es requrido.')
      .bail()
    .isNumeric()
      .withMessage('El campo telefono solo debe contener numeros.')
      .bail()
    .isLength({ max:20 })
      .withMessage('Nro de telefono solo puede contener 20 digitos como maximo.')
      .bail(),
  body('correo')
    .exists({ checkFalsy: true })
      .withMessage('Correo electronico es campo requerido.')
      .bail()
    .isEmail()
      .withMessage('Correo electronico es invalido.')
      .bail()
    .custom(emailExists),
  body('calle')
    .exists({checkFalsy: true})
      .withMessage('El campo calle de domicilio es requerido.')
      .bail(),
  body('id_estado_civil')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de estado civil es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de estado civil debe ser numerico.')
      .bail()
    .custom(estadoCivilExists),
  body('id_tipo_doc')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de tipo documento es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de tipo documento debe ser numerico.')
      .bail()
    .custom(tipoDocumentoExists),  
  body('id_nacionalidad')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de nacionalidad es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de nacionalidad debe ser numerico.')
      .bail()
    .custom(nacionalidadExists),
  body('id_genero')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de genero es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de genero debe ser numerico.')
      .bail()
    .custom(generoExists),
  body('id_localidad')
    .exists({ checkFalsy:true })
      .withMessage('El identificador de localidad es requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de localidad debe ser numerico.')
      .bail()
    .custom(localidadExists),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      next(errors)
    }

    next()
  }
]

const desable = [
  param('id')
    .exists({checkFalsy: true})
      .withMessage('El identificador de persona es campo requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de persona es numerico.')
      .bail()
    .custom(idExists)
    .custom(maybeDesable),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      next(errors)
    }

    next()
  }
]

const enable = [
  param('id')
    .exists({checkFalsy: true})
      .withMessage('El identificador de persona es campo requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de persona es numerico.')
      .bail()
    .custom(idExists)
    .custom(maybeEnable),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      next(errors)
    }

    next()
  }
]

const getById = [
  param('id')
    .exists({checkFalsy: true})
      .withMessage('El identificador de persona es campo requerido.')
      .bail()
    .isInt()
      .withMessage('El identificador de persona debe ser numerico.')
      .bail()
    .custom(idExists),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      next(errors)
    }

    next()
  }
]

module.exports = {  
  save,
  actualize,
  desable,
  enable,
  getById
}