const success = function(req, res, message, status) {
  
  res.status(status || 200).json({
      error: '',
      body: message
  })

}

const error = function(req, res, message, details) {

  res.status(res.statusCode).json({        
    error: details.errors,
    body: ''
  })

}

module.exports = {
    success, error
}