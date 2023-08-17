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

const fetchAllArticles = (topic, sort_by='created_at')=> {

    const greenListSortBy = ['title', 'created_at', 'author']

    const paramsArrayNoSQLInj = []

    let baseQueryString = `SELECT 
    a.article_id,
    COUNT(c.comment_id) comment_count,
    a.author, 
    a.title,  
    a.topic, 
    a.created_at, 
    a.votes, 
    a.article_img_url
    FROM articles a 
    LEFT JOIN comments c 
    ON a.article_id = c.article_id `

    if(topic){
        baseQueryString+=`WHERE a.topic = $1 `
        paramsArrayNoSQLInj.push(topic)
    }
    
    baseQueryString+=`GROUP BY a.article_id`

    if(greenListSortBy.includes(sort_by)){
        baseQueryString+=` ORDER BY a.${sort_by} DESC`
    }

    return db.query(baseQueryString, paramsArrayNoSQLInj)
    .then((result)=> {

        if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: 'Topic not found'
            })
        }

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
}

module.exports = {fetchArticle, fetchAllArticles, updateArticle}