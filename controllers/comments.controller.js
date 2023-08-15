const { fetchArticle } = require('../models/articles.model')
const {fetchComments} = require('../models/comments.model')

const getComments = (request, response, next) => {
    const {article_id} = request.params

    const promises = [fetchComments(article_id)]

    if(article_id){
        promises.push(fetchArticle(article_id))
    }

    Promise.all(promises)
    .then((resolvedPromises)=> {

        const comments = resolvedPromises[0]

        response.status(200).send({comments: comments})
    })
    .catch(next)
}


module.exports = {getComments}