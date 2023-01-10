
const { Router } = require('express');
const { check } = require('express-validator');

/*const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');*/

const { getMenues } = require('../controllers/menues');

const router = Router();

router.get('/', getMenues );

module.exports = router;