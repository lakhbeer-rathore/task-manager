async function errorHandler(error, req, res, next) {

   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
     res.status(statusCode).json({ 
        success: false,
        message: error.message 
    });
}

module.exports = errorHandler;