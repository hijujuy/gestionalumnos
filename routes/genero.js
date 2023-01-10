const express = require('express')

const controller = require('../controllers/genero')

const validator = require('../middlewares/objects_validators/genero')

const router = express.Router()

router.post('/', validator.save, controller.save)

router.put('/:id', validator.actualize, controller.actualize)

router.delete('/:id', validator.desable, controller.desable)

router.post('/:id', validator.enable, controller.enable)

router.get('/:id', validator.getById, controller.getById)

router.get('/', controller.getAll)

module.exports = router;