const db = require('../db/connection')

const fetchArticle = (article_id)=> {
    return db.query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then((result)=> {
        console.log(result.rows)
        return result.rows[0]
    })

}

module.exports = {fetchArticle}