const db = require('../db/connection')
const format = require('pg-format')


insertNewComment = (newComment) => {

    console.log(newComment, "in model")

    const formattedInputComment = []


    const queryString = format(`INSERT INTO comments 
    (article_id, author, body, votes) 
    VALUES 
    %L
    RETURNING *`, formattedInputComment)

    return db.query(queryString)
}


module.exports = {insertNewComment}