const express = require("express");

const controller = require("../controllers/usuario");

const validator = require("../middlewares/objects_validators/usuario");

const router = express.Router();

router.post("/", validator.save, controller.save);

/*router.put("/:id", validator.actualize, controller.actualize);

router.delete("/:id", validator.disable, controller.disable);

router.post("/:id", validator.enable, controller.enable);

router.get("/:id", validator.getById, controller.getById);

router.get("/", controller.getAll);*/

module.exports = router;
