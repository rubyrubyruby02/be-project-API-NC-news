const customErrorHandler = ((error, request, response, next)=> {
    
    if(error.status && error.msg){
        response.status(error.status).send({status: error.status, msg: error.msg})
    }
    else{
        next(error)
    }
})

module.exports = {customErrorHandler}