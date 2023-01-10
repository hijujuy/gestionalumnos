const { response, request } = require('express');
const { PrismaClient } = require ('@prisma/client');

const listarInstitutos = async(req = request, res = response) => {

  res.json({
        msg: 'listarInstitutos ok'
    })
  
}

module.exports = {
  listarInstitutos,
}
