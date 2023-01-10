const { body, param, validationResult } = require('express-validator')
const { nombreExists,idExists, maybeDesable, maybeEnable } = require('../../helpers/objects_helpers/genero')

const save = [
  body('nombre')
    .exists({checkFalsy: true})
      .withMessage('El campo nombre esta vacio.')
      .bail()
    .isAlpha('es-ES', { ignore: ' ' })
      .withMessage('El campo nombre solo debe contener letras.')
      .bail()
    .custom(nombreExists)
      .bail(),

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
      .withMessage('No se proporcionó valor id.')
      .bail()
    .isInt()
      .withMessage('Valor id solo permite numeros.')
      .bail()
    .custom(idExists),
  body('nombre')
    .exists({checkFalsy: true})
      .withMessage('No se proporcionó valor nombre.')
      .bail()
    .isAlpha('es-ES', { ignore: ' ' })
      .withMessage('Valor nombre solo permite letras.')
      .bail(),
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
      .withMessage('No se proporcionó valor id.')
      .bail()
    .isInt()
      .withMessage('Valor id solo permite numeros.')
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
      .withMessage('No se proporcionó valor id.')
      .bail()
    .isInt()
      .withMessage('Valor id solo permite numeros.')
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
      .withMessage('No se proporcionó valor id.')
      .bail()
    .isInt()
      .withMessage('Valor id solo permite numeros.')
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