const db = require('../db/connection')

const fetchArticle = (article_id)=> {

    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result)=> {

        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: 'Article Id not found'
            })
        }
        
        return result.rows[0]
    })
}

const fetchAllArticles = ()=> {

    return db.query(`SELECT 
    a.article_id,
    COUNT(c.comment_id) comment_count,
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

        return result.rows
    })
}

const updateArticle = (article_id, inc_votes)=> {

    const formattedValues = [inc_votes, article_id]

    const queryString = `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`

    return db.query(queryString, formattedValues)
    .then((result)=> {

        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: 'Article Id not found'
            })
        }
        return result.rows[0]
    })
    .catch((error)=> {
        return Promise.reject(error)
    })

}

module.exports = {fetchArticle, fetchAllArticles, updateArticle}