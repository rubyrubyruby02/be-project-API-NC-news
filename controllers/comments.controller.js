const {fetchArticle } = require('../models/articles.model')
const {fetchComments, insertNewComment, removeComment, checkCommentIdExists} = require('../models/comments.model')

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

const postNewComment = (request, response, next)=> {
    const newComment = request.body
    const {article_id} = request.params
    insertNewComment(article_id, newComment)
    .then((result)=> { 
        response.status(201).send({new_comment: result})
    })
    .catch(next)
}

const deleteComment = (request, response, next) => {
    const {comment_id} = request.params

    const promises = [checkCommentIdExists(comment_id)]

    if(comment_id){
        promises.push(removeComment(comment_id))
    }
    
    Promise.all(promises)
    .then((resolvedPromises)=> {

        console.log(resolvedPromises, "resolvedPromises")

        const deletedcomment = resolvedPromises[0]
        response.status(204).send({deleteComment})
    })
    .catch(next)
}


module.exports = {getComments, postNewComment, deleteComment}