const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');

const save = async(req, res) => {
    req.usuario = {id : 1}

    try {
        const result = await prisma.estados_civiles.create({
            data: {
                nombre:     req.body.nombre,
                id_usuario_creador:     req.usuario.id,
                id_usuario_modificador: req.usuario.id,
            },
        })
        response.success(req, res, result, 201)
    }
    catch (error) {
        response.error(req, res, "Error interno.", 500, error)
    }

}

const actualize = async (req, res) => {
    req.usuario = { id: 1 }

    try {        
        const result = await prisma.estados_civiles.update({
            where: { 
                id: Number(req.params.id) 
            },
            data: {
                nombre:     req.body.nombre,
                id_usuario_modificador: req.usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Error interno.", 500, error)
    }

}

const desable = async(req, res) => {
    req.usuario = { id: 2 }
    
    try {
        const result = await prisma.estados_civiles.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                estado: false,
                id_usuario_modificador: req.usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Error interno.", 500, error)
    }   
}

const enable = async(req, res) => {
    req.usuario = { id: 2 }
    
    try {
        const result = await prisma.estados_civiles.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                estado: true,
                id_usuario_modificador: req.usuario.id,
            },
        })
        response.success(req, res, result, 200)
    }
    catch (error) {
        response.error(req, res, "Error interno.", 500, error)
    }   

}

const getAll = async (req, res) => {

    try {        
        const list = await prisma.estados_civiles.findMany();
        
        response.success(req, res, list, 200)
    }
    catch (e) {
        response.error(req, res, "Error server", 500, e)
    }
}

const getById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        if (Number.isInteger(id)) {
            const estado_civil = await prisma.estados_civiles.findUnique({
                where: {
                    id: id
                },
            });
    
            if (!estado_civil) {
                response.error(req, res, [], 404, { table: 'estado_civil', id: id })
            }
            else {
                response.success(req, res, estado_civil, 200)
            }
        }
        else {
            response.error(req, res, [], 400, `ID parametro de ruta no es numero entero valido`)
        }       
    }
    catch (e) {
        response.error(req, res, "Error server", 500, e)
    }

}

module.exports = {
    save,
    actualize,
    desable,
    enable,
    getAll,
    getById,
}