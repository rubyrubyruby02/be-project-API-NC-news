

const userInputErrors = ((error, request, response, next)=> {

    console.log("in errors.js")

    if(error.status && error.msg){
        response.status(error.status).send({status: error.status, msg: error.msg})
    }
    else{
        next(error)
    }
})


module.exports = {userInputErrors}