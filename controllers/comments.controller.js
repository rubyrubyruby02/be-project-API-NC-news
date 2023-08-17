const {fetchArticle } = require('../models/articles.model')
const {fetchComments, removeComment} = require('../models/comments.model')

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

const deleteComment = (request, response, next) => {
    
    const {comment_id} = request.params
    
    removeComment(comment_id)
    .then((result)=> {
        response.status(204).send({result})
    })
}


module.exports = {getComments, deleteComment}