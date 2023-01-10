
const { Router } = require('express');
const { check } = require('express-validator');

const {
    //validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


//const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { listarInstitutos } = require('../controllers/institutos');

const router = Router();

router.get('/', [validarJWT, esAdminRole], listarInstitutos );

module.exports = router;