const express = require('express')

const controller = require('../controllers/estado')

const router = express.Router()

router.post('/', controller.save)

router.put('/:id', controller.actualize)

router.delete('/:id', controller.desable)

router.post('/:id', controller.enable)

router.get('/', controller.getAll)

router.get('/:id', controller.getById)

module.exports = router;