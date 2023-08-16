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


module.exports = {fetchComments}