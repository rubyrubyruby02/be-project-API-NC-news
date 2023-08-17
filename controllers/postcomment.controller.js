const {insertNewComment} = require('../models/insertComment.model')

const postNewComment = (request, response, next)=> {

    const newComment = request.body
    const {article_id} = request.params

    insertNewComment(article_id, newComment)
    .then((result)=> {
        
        response.status(201).send({new_comment: result})
    })
    .catch(next)
}

module.exports = {postNewComment}