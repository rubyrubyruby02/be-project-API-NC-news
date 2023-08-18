const db = require('../db/connection')

const fetchComments = (article_id) => {
    return db.query(`SELECT c.comment_id,
    c.votes,
    c.created_at,
    c.author,
    c.body,
    c.article_id
    FROM comments c
    WHERE c.article_id = $1
    ORDER BY c.created_at DESC;`, [article_id])
    .then((result)=> {
        return result.rows
    })
}

const updateComment = (comment_id, inc_votes) => {
    return db.query(`UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`, [inc_votes, comment_id])
    .then((result)=> {
        return result.rows[0]
    })

}

const insertNewComment = (article_id, newComment) => {
    const {username, body} = newComment
    const formattedValues = [body, username, parseInt(article_id)]
    return db.query(`INSERT INTO comments 
    (body, author, article_id) 
    VALUES 
    ($1, $2, $3)
    RETURNING *;`, formattedValues)
    .then((result)=> {
        return result.rows[0]
    })
    .catch((error)=> {
        return Promise.reject(error)
    })
    
}


const checkCommentIdExists = (comment_id) => {
    return db.query(`SELECT comment_id FROM comments WHERE comment_id = $1`, [comment_id])
    .then((result)=> {

        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: "Not found"
            })
        }

        return result.rows
    })
}

const removeComment = (comment_id) => {
    const queryString = `DELETE FROM comments WHERE comment_id = $1`
    const values = [comment_id]
    return db.query(queryString, values)
    .then((result)=> {
        return result.rows
    })
}

module.exports = {fetchComments, updateComment, insertNewComment, removeComment, checkCommentIdExists}