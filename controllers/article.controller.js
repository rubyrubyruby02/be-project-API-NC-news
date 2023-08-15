const {fetchArticle} = require('../models/articles.model')

const getArticle = (request, response, next) => {
    const {article_id} = request.params

    fetchArticle(article_id).then((result)=> {
        response.status(200).send({result})
    })
    .catch(next)
}

module.exports = {getArticle}