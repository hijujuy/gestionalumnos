const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const response = require('../network/response');
/* 
    Validar si viene un valor en el body llamado nombre
    Validar si ese valor ya existe
*/

const save = async(req, res) => {
    req.usuario = {id : 1}
    
    try {
        const result = await prisma.generos.create({
            data: {
                nombre:                 req.body.nombre,
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
        
        const result = await prisma.generos.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                nombre:          req.body.nombre,
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
        const result = await prisma.generos.update({
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
        const result = await prisma.generos.update({
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
        const list = await prisma.generos.findMany()

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
                        
            const genero = await prisma.generos.findUnique({
                where: {
                    id: Number(id)
                },
            })
    
            if (!genero) {
                response.error(req, res, [], 404, { table: 'genero', id: id})
            }
            else {
                response.success(req, res, genero, 200)
            }
        }
        else {
            response.error(req, res, [], 400, `ID parametro de ruta no es numero entero valido`)
        }
    }
    catch (e) {
        response.error(req, res, "Error server", 500, e.stack)
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