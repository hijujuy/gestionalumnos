const express = require("express");

const controller = require("../controllers/correo");

//const validator = require("../middlewares/objects_validators/usuario");

const router = express.Router();

router.post("/", controller.enviar);

module.exports = router;
