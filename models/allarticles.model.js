const db = require('../db/connection')

const fetchAllArticles = ()=> {

    return db.query(`SELECT 
    a.article_id,
    COUNT(c.comment_id),
    a.author, 
    a.title,  
    a.topic, 
    a.created_at, 
    a.votes, 
    a.article_img_url
    FROM articles a 
    INNER JOIN comments c 
    ON a.article_id = c.article_id
    GROUP BY a.article_id
    ORDER BY a.created_at DESC;`)
    .then((result)=> {

        console.log(result.rows, "in model")

        return result.rows
    })
    .catch(error)
}

module.exports = {fetchAllArticles}