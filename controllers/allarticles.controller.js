const {fetchAllArticles} = require('../models/allarticles.model')

const getAllArticles = (request, response, next) => {

    fetchAllArticles()
    .then((result)=>{
        response.status(200).send({articles: result})
    })
    .catch(next)
}


module.exports = {getAllArticles}