const express = require("express");

const controller = require("../controllers/persona");

const validator = require("../middlewares/objects_validators/persona");

const router = express.Router();

router.post("/", validator.save, controller.save);

router.put("/:id", validator.actualize, controller.actualize);

router.delete("/:id", validator.desable, controller.desable);

router.post("/:id", validator.enable, controller.enable);

router.get("/:id", validator.getById, controller.getById);

router.get("/", controller.getAll);

module.exports = router;
