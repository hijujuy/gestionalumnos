const { body, validationResult } = require('express-validator')

const validateFields = [
  body('nombre')
  .exists({checkFalsy: true})
    .withMessage('El campo nombre esta vacio.')
    .bail()
  .isAlpha()
    .withMessage('El campo nombre solo debe contener letras.')
    .bail()
  /* .custom(generoExistente)
    .bail() */,
  (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      console.log(errors)
      next(errors)
    }

    next()
  }
]



module.exports = {  
  validateFields,
}