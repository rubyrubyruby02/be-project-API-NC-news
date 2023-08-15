const {insertNewComment} = require('../models/insertComment.model')

postNewComment = (request, response, next)=> {

    const newComment = request.body

    console.log(newComment, "in controller")

    insertNewComment(newComment)

    .then((result)=> {
        response.status(201).send({new_comment: result})
    })
    .catch(next)
}

module.exports = {postNewComment}