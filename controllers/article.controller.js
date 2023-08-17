const {fetchArticle, fetchAllArticles, updateArticle} = require('../models/articles.model')

const getArticle = (request, response, next) => {
    const {article_id} = request.params
    fetchArticle(article_id).then((result)=> {
        response.status(200).send({result})
    })
    .catch(next)
}


const getAllArticles = (request, response, next) => {
    fetchAllArticles()
    .then((result)=>{
        response.status(200).send({articles: result})
    })
    .catch(next)
}


const patchArticle = (request, response, next)=> {
    
    const {inc_votes} = request.body
    const {article_id} = request.params

    updateArticle(article_id, inc_votes)
    .then((result)=> {
        response.status(200).send({updatedArticle: result})
    })
    .catch(next)

}

module.exports = {getArticle, getAllArticles, patchArticle}