const db = require('../db/connection')


const insertNewComment = (article_id, newComment) => {

    const {username, body} = newComment
    const formattedValues = [body, username, parseInt(article_id)]

    return db.query(`INSERT INTO comments 
    (body, author, article_id) 
    VALUES 
    ($1, $2, $3)
    RETURNING *;`, formattedValues)
    .then((result)=> {
        return result.rows
    })
    .catch((error)=> {
        return Promise.reject(error)
    })
    
}

module.exports = {insertNewComment}