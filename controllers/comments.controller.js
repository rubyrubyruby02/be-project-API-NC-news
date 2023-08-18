const {fetchArticle } = require('../models/articles.model')
const {fetchComments, updateComment, insertNewComment, removeComment, checkCommentIdExists} = require('../models/comments.model')

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

const patchComment = (request, response, next) => {
    const {comment_id} = request.params
    const {inc_votes} = request.body

    const promises = [checkCommentIdExists(comment_id)]

    if(comment_id){
        promises.push(updateComment(comment_id, inc_votes))
    }

    Promise.all(promises)
    .then((resolvedPromises)=> {
        const updatedComment = resolvedPromises[1]
        response.status(200).send({updatedComment})
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
        const deletedcomment = resolvedPromises[0]
        response.status(204).send()
    })
    .catch(next)
}

module.exports = {getComments, patchComment, postNewComment, deleteComment}