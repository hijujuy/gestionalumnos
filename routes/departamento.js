const express = require('express')

const controller = require('../controllers/departamento')

const router = express.Router()

router.post('/', controller.save)

router.put('/:id', controller.actualize)

router.get('/:id', controller.getById)

router.get('/', controller.getAll)

router.get('/provincia/:id', controller.getByIdProvincia)

module.exports = router;