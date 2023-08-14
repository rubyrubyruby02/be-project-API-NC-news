const {fetchArticle} = require('../models/articles.model')

const getArticle = (request, response, next) => {
    const {article_id} = request.params

    fetchArticle(article_id).then((result)=> {

        console.log(result)
        response.status(200).send({result})
    })
    .catch(error)
}

module.exports = {getArticle}