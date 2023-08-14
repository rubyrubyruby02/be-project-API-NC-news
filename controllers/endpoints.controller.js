const {fetchEndpoints} = require('../models/endpoints.model')

const getEndpoints = (request, response, next)=> {

    fetchEndpoints().then((result)=> {
        response.status(200).send({result})
    })
}
module.exports = {getEndpoints}