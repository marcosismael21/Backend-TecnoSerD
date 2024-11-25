const saveLogErrorHandlerMiddleware=(error,req,res,next)=>{
    saveLogError(error);
    next(error);
}

module.exports=saveLogErrorHandlerMiddleware;