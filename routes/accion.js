const express = require('express')

const controller = require('../controllers/accion')

const router = express.Router()

router.post('/', controller.save)

router.put('/:id', controller.actualize)

router.get('/', controller.getAll)

router.get('/:id', controller.getById)

module.exports = router;