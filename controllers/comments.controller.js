const {fetchComments} = require('../models/comments.model')

const getComments = (request, response, next) => {
    const {article_id} = request.params
    fetchComments(article_id).then((result)=> {
        response.status(200).send({comments: result})
    })
    .catch(next)
}


module.exports = {getComments}