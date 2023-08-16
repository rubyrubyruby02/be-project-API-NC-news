const db = require('../db/connection')
const format = require('pg-format')


const insertNewComment = (newComment) => {

    const {votes, author, body, article_id} = newComment
    console.log(newComment)

    return db.query(`INSERT INTO comments 
    (body, article_id, author, votes) 
    VALUES 
    ($1, $2, $3, $4)
    RETURNING *;`,[body, article_id, author, votes])

    .then((result)=> {

        console.log(result.rows, "rows")

        return result.rows
    })
    
}


module.exports = {insertNewComment}