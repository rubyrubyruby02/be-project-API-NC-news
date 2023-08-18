const PSQLErrorHandler = ((error, request, response, next) => {
    if(error.code === '22P02'){
        response.status(400).send({
            msg: 'Bad request',
            detail: error.detail
        })
    }
    else if(error.code === '23503'){
        response.status(404).send({
            msg: 'Not found',
            detail: error.detail})
    }
    else if (error.code === '23502'){
        response.status(400)
        .send({
            msg: 'Missing input',
            detail: error.detail
        })
    }
    else{
        next(error)
    }
})

const customErrorHandler = ((error, request, response, next) => {

    if(error.status && error.msg){
        response.status(error.status).send({ msg: error.msg})
    }
    else{
        next(error)
    }
})


module.exports = {customErrorHandler, PSQLErrorHandler}