const express = require('express')

const controller = require('../controllers/provincia')

const router = express.Router()

router.post('/', controller.save)

router.put('/:id', controller.actualize)

router.get('/:id', controller.getById)

router.get('/', controller.getAll)

module.exports = router;