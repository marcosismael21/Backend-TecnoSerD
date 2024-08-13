const errorHandlerMiddleware = (err, req, res, next) => {
    const {
        error,
        status,
        message
    } = err;
    if (error && status && message) {
        res.status(status).json({
            status,
            message
        })
    }else{
        res.status(500).json({
            status:500,
            message:"Servicio no disponible"
        })
    }


}

module.exports = errorHandlerMiddleware